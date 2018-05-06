import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Form, Comment, Header, Button } from 'semantic-ui-react'
import { Message } from 'components'

export default class MessagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      headers: this.props.headers,
      volunteerName: this.props.conversation.volunteer_name,
      taskOwnerName: this.props.conversation.task_owner_name,
      body: '',
    }
  }

  componentWillMount() {
    const { id, task_id } = this.props.conversation
    console.log(this.props)
    const url = process.env.REACT_APP_API
    const path = `conversations/${id}`
    const headers = this.state.headers
    axios
      .get(url + path, headers)
      .then(response => {
        this.setState({ messages: response.data.data.messages })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  sendMessage = () => {
    const { id, task_id } = this.props.conversation
    console.log(this.props)
    const url = process.env.REACT_APP_API
    const path = `conversations/${id}`
    const body = { message: { body: this.state.body } }
    const headers = this.state.headers
    axios
      .post(url + path, body, headers)
      .then(response => {
        this.setState({ messages: response.data.data.messages })
      })
      .catch(err => {
        console.log(err)
      })
    this.setState({ body: '' })
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
        <Form reply onSubmit={this.sendMessage}>
          <Form.Group>
            <Form.Input placeholder="Message" name="body" value={body} onChange={this.handleChange} />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
      </React.Fragment>
    )
  }
}
MessagesContainer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  task_id: PropTypes.string,
}
