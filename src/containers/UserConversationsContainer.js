import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form, Header, Button } from 'semantic-ui-react'
import { ActionCableProvider, ActionCable } from 'react-actioncable-provider'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { TaskOwnerConvHeader, TaskDetails } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMessages, sendMessage, doneTask, addMessage, getUserMarkers } from 'actions'
import { api as url, WS } from '../constants/variables'

class UserConversationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: this.props.id,
      activeConv: null,
      currentConv: null,
      body: '',
      task: {},
      conversations: [],
      messages: [],
    }
  }

  componentWillMount() {
    {
      this.props.id ? this.props.getConversations(this.props.id, this.props.headers) : null
    }
  }

  componentDidMount() {
    if (this.props.conversations.length > 0 && this.state.currentConv === null) {
      const id = this.props.conversations[0].id
      this.setState({ activeConv: id })
      this.setState({ currentConv: this.props.conversations.filter(conv => conv.id == id)[0] })
    }
  }

  componentDidUpdate() {
    if (this.props.conversations.length > 0 && this.state.currentConv === null) {
      const id = this.props.conversations[0].id
      this.setState({ activeConv: id })
      this.setState({ currentConv: this.props.conversations.filter(conv => conv.id == id)[0] })
    }
  }

  handleSendMessage = () => {
    const id = this.props.activeIndex
    this.props.sendMessage(this.state.activeConv, this.state.body, this.props.headers)
    this.setState({ body: '' })
  }

  handleDoneClick = () =>{
    this.props.doneTask(this.state.activeConv, this.props.headers)
    this.props.getUserMarkers(this.props.headers)
  }

  handleRepublishClick = () =>
    this.props.history.push({
      pathname: '/task',
      state: { ...this.props.task, done: 0 },
    })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleItemClick = (e, { id }) => {
    this.setState({ activeConv: id })
    this.setState({
      currentConv: this.props.conversations.filter(conv => conv.id == id)[0]
        ? this.props.conversations.filter(conv => conv.id == id)[0]
        : null,
    })
  }
  onReceived = message => {
    this.props.addMessage(message)
  }

  renderContent(conv) {
    const { task, user, conversations, messages, ltm } = this.props
    const { body, currentConv, activeConv } = this.state
    if (task === {}) {
      return <h1>Loading ...</h1>
    }
    return (
      <Fragment>
        {currentConv &&
          conversations.length > 0 && (
            <Fragment>
              <Header>'Conversation for task: '{task.title}</Header>
              <TaskOwnerConvHeader
                handleDoneClick={this.handleDoneClick}
                handleItemClick={this.handleItemClick}
                handleRepublishClick={this.handleRepublishClick}
                conversations={conversations}
                activeConv={activeConv}
                task={task}
                user={user}
              />

              <MessagesContainer
                height={ltm ? '30vh' : '30vh'}
                messages={messages.filter(message => message.conversation_id == this.state.activeConv)}
                conversation={this.state.currentConv}
              />
              <Form reply onSubmit={this.handleSendMessage}>
                <Form.Group>
                  <Form.Input placeholder="Message" name="body" value={body} onChange={this.handleChange} />
                  <Form.Button content="Submit" />
                </Form.Group>
              </Form>
            </Fragment>
          )}
      </Fragment>
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
  activeIndex: state.activeIndex,
  conversations: state.conversations,
  headers: state.headers,
  markers: state.markers,
  task: state.currentTask,
  browser: state.browser,
  ltm: state.browser.lessThan.medium,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateActiveIndex, sendMessage, getConversations, getMessages, doneTask, addMessage, getUserMarkers },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserConversationsContainer))
