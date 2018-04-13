import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
function signupBody(email, password, password_confirmation, first_name, last_name) {
  return {
    user: {
      first_name: first_name,
      last_name: last_name,
      password: password,
      password_confirmation: password_confirmation,
      email: email,
    },
  }
}

class SignUpForm extends Component {
  state = {
    user: {},
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    modalOpen: false,
    modalData: '',
    modalHeader: '',
    modalButton: () => {},
  }
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: value,
    })
  handleSignUpSubmit = () => {
    const { first_name, last_name, email, password, password_confirmation } = this.state
    axios
      .post('/api/sign_up', signupBody(email, password, password_confirmation, first_name, last_name))
      .then(response => {
        if (response.status === 200) {
          this.setState({ modalHeader: `User created` })
        }
        this.setState({
          modalData: `Hi ${first_name} ${last_name}. Your account was created. 
            You can login to the website using your email address ${email}`,
        })
        console.log(response)
        this.setState({
          modalButton: () => {
            this.props.history.push('/')
          },
        })
        this.props.signup({ user: response.data.data.user })
        this.setState({ modalOpen: true })
      })
      .catch(error => {
        console.log(error.response.data.messages)
        this.setState({ modalHeader: `Error` })
        this.setState({
          modalData:
            error.response.data.messages || 'There was an error submitting the form, please try again in 5 minutes',
        })
        this.setState({
          modalButton: () => this.setState({ modalOpen: false }),
        })
        this.setState({ modalOpen: true })
        console.log(error.response.data)
      })
  }
  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {' '}
              Create new account
            </Header>
            <Form size="large" onSubmit={this.handleSignUpSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="First Name"
                  placeholder="First Name"
                  name="first_name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="Last Name"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  label="Email Address"
                  name="email"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  label="Password"
                  name="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  label="Confirm Password"
                  name="password_confirmation"
                  onChange={this.handleChange}
                />
                <Form.Checkbox label="I agree to the Terms and Conditions" />

                <Button color="teal" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <Link to={'/login'}>Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
        <Modal style={inlineStyle.modal} open={this.state.modalOpen} onClose={this.handleClose}>
          <Modal.Header> {this.state.modalHeader} </Modal.Header>
          <Modal.Content>{this.state.modalData}</Modal.Content>
          <Modal.Actions>
            <Button color="teal" onClick={this.state.modalButton}>
              OK
            </Button>{' '}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
