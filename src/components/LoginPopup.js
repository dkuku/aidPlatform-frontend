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
class LoginPopup extends Component {
  state = { modalOpen: false }
  handleOpen = () =>
    fetch('api/sign_in', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sign_in: {
          email: 'dan@wp.pl',
          password: '123qwe',
        },
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data.user)
        this.props.login({ user: data.data.user })
      })

  //handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  render() {
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
            <Form>
              <Form.Input label="First name" placeholder="First name" />
              <Form.Input label="Last name" placeholder="Last name" />
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
