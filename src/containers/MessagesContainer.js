import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Comment, Header, Button } from 'semantic-ui-react'
import { Message } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMessages, sendMessage } from 'actions'

class MessagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      headers: this.props.headers,
      conversation: this.props.conversations.filter(conv => conv.id == this.props.activeIndex)[0]
        ? this.props.conversations.filter(conv => conv.id == this.props.activeIndex)[0]
        : null,
    }
  }

  componentWillMount() {
    getMessages(this.state.headers)
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSendMessage = () => {
    const { id } = this.props.conversation
    const headers = this.state.headers
    sendMessage(id, this.state.body, headers)
  }

  handleDoneClick = () => console.log('done clicked')

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { taskOwnerName, volunteerName, body } = this.state
    return (
      <React.Fragment>
        <Header as="h3">
          {`Conversation with ${volunteerName} `}
          <Button negative onClick={this.handleDoneClick} floated="right">
            Mark task done
          </Button>
        </Header>
        <Comment.Group style={{ height: '700px', overflow: 'hidden', overflowY: 'scroll' }}>
          {this.state.messages.map(message => (
            <Message
              ref={message.id}
              key={message.id}
              message={message}
              owner={message.owner}
              author={message.owner ? taskOwnerName : volunteerName}
            />
          ))}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el
            }}
          />
        </Comment.Group>
        <Form reply onSubmit={this.handleSendMessage}>
          <Form.Group>
            <Form.Input placeholder="Message" name="body" value={body} onChange={this.handleChange} />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    activeIndex: state.activeIndex,
    conversations: state.conversations,
    messages: state.messages,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, sendMessage, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)

MessagesContainer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  task_id: PropTypes.string,
}
