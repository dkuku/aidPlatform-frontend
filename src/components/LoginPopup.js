import React, { Component } from 'react'
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from 'actions/user'

// temporary solution for modal not centered in semantic ui
const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
}
function body(email, password) {
  return JSON.stringify({
    sign_in: {
      email: email,
      password: password,
    },
  })
}

class LoginPopup extends Component {
  state = {
    modalOpen: false,
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    email: '',
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () =>
    fetch('api/sign_in', {
      method: 'post',
      headers: headers,
      body: body(this.state.email, this.state.password),
    })
      .then(res => res.json())
      .then(data => {
        this.props.login({ user: data.data.user })
      })

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  render() {
    const { first_name, last_name, email, password, password_confirmation } = this.state
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={inlineStyle.modal}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                label="First name"
                placeholder="First name"
                name="first_name"
                value={first_name}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Last name"
                placeholder="Last name"
                name="last_name"
                value={last_name}
                onChange={this.handleChange}
              />
              <Form.Input label="Email" placeholder="email" name="email" value={email} onChange={this.handleChange} />
              <Form.Input label="Password" value={password} name="password" onChange={this.handleChange} />
              <Form.Input
                label="Confirm Password"
                name="password_confirmation"
                value={password_confirmation}
                onChange={this.handleChange}
              />
              <Form.Checkbox label="I agree to the Terms and Conditions" />
              <Button type="submit">Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup)
