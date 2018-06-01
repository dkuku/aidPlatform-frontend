import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { Form, Header, Button, Icon } from 'semantic-ui-react'
import { ActionCableProvider, ActionCable } from 'react-actioncable-provider'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { TaskOwnerConvHeader, TaskDetails, MessageForm } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  updateActiveIndex,
  updateActiveConversation,
  getConversations,
  getMessages,
  sendMessage,
  doneTask,
  addMessage,
  getUserMarkers,
  messagesClose,
} from 'actions'
import { api as url, WS } from '../constants/variables'

class UserConversationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentConv: null,
      body: '',
      task: {},
      conversations: [],
      messages: [],
    }
  }

  componentWillMount() {
    {
      this.props.activeIndex ? this.props.getConversations(this.props.activeIndex, this.props.headers) : null
    }
  }

  componentDidMount() {
    if (this.props.conversations.length > 0 && this.state.currentConv === null) {
      const id = this.props.conversations[0].id
      this.props.updateActiveConversation(id)
      this.setState({ currentConv: this.props.conversations.filter(conv => conv.id == id)[0] })
    }
  }

  componentDidUpdate() {
    if (this.props.conversations.length > 0 && this.state.currentConv === null) {
      const id = this.props.conversations[0].id
      this.props.updateActiveConversation(id)
      this.setState({ currentConv: this.props.conversations.filter(conv => conv.id == id)[0] })
    }
  }

  handleSendMessage = () => {
    const id = this.props.activeIndex
    this.props.sendMessage(this.props.activeConversation, this.state.body, this.props.headers)
    this.setState({ body: '' })
  }

  handleDoneClick = () => {
    this.props.doneTask(this.props.activeConversation, this.props.headers)
    this.props.getUserMarkers(this.props.headers)
  }

  handleRepublishClick = () =>
    this.props.history.push({
      pathname: '/task',
      state: { ...this.props.task, done: 0 },
    })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleItemClick = (e, { id }) => {
    this.props.updateActiveConversation(id)
    this.setState({
      currentConv: this.props.conversations.filter(conv => conv.id == id)[0]
        ? this.props.conversations.filter(conv => conv.id == id)[0]
        : null,
    })
  }

  handleCloseClick = () => {
    this.props.messagesClose()
  }

  onReceived = message => {
    this.props.addMessage(message)
  }

  renderContent(conv) {
    const { task, user, conversations, messages, activeConversation, closeButton=false } = this.props
    const { body, currentConv } = this.state
    if (task === {}) {
      return <h1>Loading ...</h1>
    }
    return (
      <Fragment>
        {currentConv &&
          conversations.length > 0 && (
            <Fragment>
              <Header>
                Task: {task.title}
                {closeButton&&
                <Button icon basic color="teal" floated="right" onClick={this.handleCloseClick}>
                  <Icon name="delete" />
                </Button>}
              </Header>
              <TaskOwnerConvHeader
                volunteer={this.props.volunteer}
                handleItemClick={this.handleItemClick}
                conversations={conversations}
                activeConv={activeConversation}
                task={task}
                user={user}
              />

              <MessagesContainer
                height={'100%'}
                messages={messages.filter(message => message.conversation_id == this.props.activeConversation)}
                conversation={currentConv}
                isOwner={user.id==currentConv.task_owner_id}
              />
              <MessageForm handleSendMessage={this.handleSendMessage} handleChange={this.handleChange} body={body} />
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
  activeIndex: state.variables.activeIndex,
  activeConversation: state.variables.activeConversation,
  conversations: state.conversations,
  headers: state.headers,
  markers: state.markers,
  task: state.currentTask,
  browser: state.browser,
  smallScreen: state.browser.lessThan.medium,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateActiveIndex,
      sendMessage,
      getConversations,
      updateActiveConversation,
      getMessages,
      doneTask,
      addMessage,
      getUserMarkers,
      messagesClose,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserConversationsContainer))
