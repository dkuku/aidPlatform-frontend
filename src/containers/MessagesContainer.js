import React, { Component } from 'react'
import { Button, Header, Comment, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Message } from 'components'

class VolunteerConvHeader extends Component {
  componentDidMount() {
    console.log(this.props)
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
    const { messages, taskOwnerName, volunteerName } = this.props
    return (
      <Comment.Group style={{ height: '500px', overflow: 'hidden', overflowY: 'scroll' }}>
        {messages.map(message => (
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
    )
  }
}

export default VolunteerConvHeader
