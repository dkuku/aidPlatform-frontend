import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form, Header } from 'semantic-ui-react'
import axios from 'axios'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { TaskOwnerConvHeader } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMessages, sendMessage } from 'actions'

const url = process.env.REACT_APP_API

class ConversationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: Number(this.props.id),
      activeConv: null,
      currentConv: null,
      body: '',
      task: {},
      conversations: [],
      messages: [],
    }
  }

  componentWillMount() {
    console.log('111111111112222222222wqwqwq')
    this.props.getConversations(this.props.id, this.props.headers)
  }

  handleSendMessage = () => {
    const id = this.props.activeIndex
    this.props.sendMessage(this.state.activeConv, this.state.body, this.props.headers)
  }

  handleDoneClick = () => this.props.doneTask(this.props.conversations[0].id, this.props.headers)
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleItemClick = (e, { id }) => {
    this.setState({ activeConv: id })
    this.setState({
      currentConv: this.props.conversations.filter(conv => conv.id == id)[0]
        ? this.props.conversations.filter(conv => conv.id == id)[0]
        : null,
    })
  }

  renderContent(conv) {
    const { task, conversations, messages } = this.props
    const { body } = this.state
    if (task === {}) {
      return <h1>Loading ...</h1>
    }
    return (
      <React.Fragment>
        <TaskOwnerConvHeader
          handleItemClick={this.handleItemClick}
          conversations={conversations}
          activeConv={this.state.activeConv}
        />

        {this.state.currentConv && (
          <React.Fragment>
            <MessagesContainer
              messages={messages.filter(message => message.conversation_id == this.state.activeConv)}
              conversation={this.state.currentConv}
            />
            <Form reply onSubmit={this.handleSendMessage}>
              <Form.Group>
                <Form.Input placeholder="Message" name="body" value={body} onChange={this.handleChange} />
                <Form.Button content="Submit" />
              </Form.Group>
            </Form>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
  render() {
    return (
      <React.Fragment>
        <Header>Conversations for {this.props.task.title}</Header>
        {this.renderContent(this.state.currentConv)}
      </React.Fragment>
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
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, sendMessage, getConversations, getMessages }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversationsContainer))

ConversationsContainer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  task_id: PropTypes.string,
}
