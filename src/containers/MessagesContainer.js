import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Form } from 'semantic-ui-react'
import { Message } from 'components'

export default class MessagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      volunteerName: this.props.conversation.first_name + ' ' + this.props.conversation.last_name,
      userName: this.props.user.first_name + ' ' + this.props.user.last_name,
      body: '',
    }
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  sendMessage = () => {
    const { id, task_id } = this.props.conversation
    console.log(this.props)
    const url = process.env.REACT_APP_API
    const path = `tasks/${task_id}/conversations/${id}/message`
    const headers = { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } }
    const body = { message: { body: this.state.body } }
    axios
      .post(url + path, body, headers)
      .then(response => {
        console.log(response)
        this.setState({ messages: [...this.state.messages, response.data.data.message] })
      })
      .catch(err => {
        console.log(err)
      })
    this.setState({ body: '' })
  }
  componentWillMount() {
    const { id, task_id } = this.props.conversation
    console.log(this.props)
    const url = process.env.REACT_APP_API
    const path = `tasks/${task_id}/conversations/${id}`
    const headers = { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } }
    axios
      .get(url + path, headers)
      .then(response => {
        console.log(response)
        this.setState({ messages: response.data.data.messages })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { userName, volunteerName, body } = this.state
    return (
      <React.Fragment>
        {this.state.messages.map(message => (
          <Message key={message.id} message={message} author={message.owner ? userName : volunteerName} />
        ))}
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
