import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form, Header, Button } from 'semantic-ui-react'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { TaskOwnerConvHeader } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMessages, sendMessage, doneTask } from 'actions'

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
    this.props.getConversations(this.props.id, this.props.headers)
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
  }

  handleDoneClick = () => this.props.doneTask(this.state.activeConv, this.props.headers)
  handleRepublishClick = () =>
    this.props.history.push({
      pathname: '/task',
      state: {
        title: this.props.task.title,
        description: this.props.task.description,
      },
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

  renderContent(conv) {
    const { task, conversations, messages, ltm } = this.props
    const { body } = this.state
    if (task === {}) {
      return <h1>Loading ...</h1>
    }
    return (
      <React.Fragment>
        <TaskOwnerConvHeader
          handleDoneClick={this.handleDoneClick}
          handleItemClick={this.handleItemClick}
          handleRepublishClick={this.handleRepublishClick}
          conversations={conversations}
          activeConv={this.state.activeConv}
          task={this.props.task}
        />

        {this.state.currentConv && (
          <React.Fragment>
            <MessagesContainer
              height={ltm ? '30vh' : '60vh'}
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
    return <React.Fragment>{this.renderContent(this.state.currentConv)}</React.Fragment>
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
  return bindActionCreators({ updateActiveIndex, sendMessage, getConversations, getMessages, doneTask }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversationsContainer))

ConversationsContainer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  task_id: PropTypes.string,
}
