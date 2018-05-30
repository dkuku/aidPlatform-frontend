import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form, Header, Button } from 'semantic-ui-react'
import { ActionCableProvider, ActionCable } from 'react-actioncable-provider'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { MessageForm } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  updateActiveIndex,
  getConversations,
  getMessages,
  sendMessage,
  doneTask,
  createConversation,
  addMessage,
} from 'actions'
import { api as url, WS } from '../constants/variables'

class ConversationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: Number(this.props.match.params.id),
      body: '',
      task: {},
      conversations: [],
      messages: [],
    }
  }

  componentWillMount() {
    this.props.getConversations(this.state.activeIndex, this.props.headers)
  }
  componentDidMount() {
    this.props.activeIndex !== this.state.activeIndex ? this.props.updateActiveIndex(this.state.activeIndex) : null
  }

  handleSendMessage = () => {
    const id = this.props.activeIndex
    this.props.sendMessage(this.props.conversations[0].id, this.state.body, this.props.headers)
    this.setState({ body: '' })
  }

  onReceived = message => {
    this.props.addMessage(message)
  }
  handleDoneClick = () => this.props.doneTask(this.props.conversations[0].id, this.props.headers)
  handleVolunteer = () => this.props.createConversation(this.props.activeIndex, this.props.headers)
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  renderContent() {
    const { task, conversations, messages, ltm } = this.props
    const { body } = this.state
    if (task === {}) {
      return <h1>Loading ...</h1>
    }
    return (
      <div style={{height: '100%' }}>
        {task && (
          <ConversationHeaderContainer
            done={task.done > 0}
            handleVolunteer={this.handleVolunteer}
            handleDoneClick={this.handleDoneClick}
            conversations={conversations}
            task={task}
          />
        )}

        {conversations[0] && (
          <React.Fragment>
            <MessagesContainer
              height={'100%'}
              messages={messages}
              conversation={conversations[0]}
            />
            <MessageForm handleSendMessage={this.handleSendMessage} handleChange={this.handleChange} body={body} />
          </React.Fragment>
        )}
      </div>
    )
  }
  render() {
    return (
      <ActionCableProvider url={WS}>
        <ActionCable
          channel={{
            channel: `TaskChannel`,
            room: `task_channel`,
          }}
          onReceived={this.onReceived}
          onConnected={() => console.log('connected')}
        />
        <Fragment>{this.renderContent(this.state.currentConv)}</Fragment>
      </ActionCableProvider>
    )
  }
}
const mapStateToProps = state => ({
  messages: state.messages,
  user: state.user,
  activeIndex: state.variables.activeIndex,
  conversations: state.conversations,
  headers: state.headers,
  markers: state.markers,
  task: state.currentTask,
  smallScreen: state.browser.lessThan.medium,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateActiveIndex, sendMessage, getConversations, getMessages, doneTask, createConversation, addMessage },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversationsContainer))
