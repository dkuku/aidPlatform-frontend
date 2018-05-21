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
    console.log(this.props)
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
      <Comment.Group style={{ height: height, overflow: 'hidden', overflowY: 'scroll' }}>
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
