import React, { Component } from 'react'
import { Button, Header, Comment, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Message } from 'components'

class MessagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volunteerName: this.props.conversation.volunteer_name,
      ownerName: this.props.conversation.task_owner_name,
    }
  }
  componentWillReceiveProps() {
    this.setState({
      volunteerName: this.props.conversation.volunteer_name,
      ownerName: this.props.conversation.task_owner_name,
    })
  }
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { messages, height } = this.props
    const { task_owner_name, volunteer_name } = this.props.conversation

    return (
      <Comment.Group style={{ minHeight: "30vh", maxHeight: '50vh', overflow: 'hidden', overflowY: 'auto' }}>
        {messages.map(message => (
          <Message
            ref={message.id}
            key={message.id}
            message={message}
            owner={message.owner}
            author={message.owner ? task_owner_name : volunteer_name}
          />
        ))}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el
          }}
        />
      </Comment.Group>
    )
  }
}

export default MessagesContainer
