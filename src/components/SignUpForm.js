import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'
import { Upload } from 'components'

function getFormData(object) {
  const formData = new FormData()
  Object.keys(object).forEach(key => formData.append(`user[${key}]`, object[key]))
  console.log(formData)
  return formData
}
function signupBody(email, password, password_confirmation, first_name, last_name, picture) {
  let userData = {
    first_name: first_name,
    last_name: last_name,
    password: password,
    password_confirmation: password_confirmation,
    email: email,
    picture: picture,
  }
  let data = getFormData(userData)
  data.append('user.picture', picture)
  return data
}

class SignUpForm extends Component {
  state = {
    user: {},
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    picture: null,
  }
  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: value,
    })
  handleChangePicture = file => {
    this.setState({ picture: file.target.files[0] })
  }
  handleSignUpSubmit = () => {
    const { first_name, last_name, email, password, password_confirmation, picture } = this.state
    this.props.signup(signupBody(email, password, password_confirmation, first_name, last_name, picture))
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
      body > div > div.login-form {
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
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Id photo"
                  type="file"
                  label="Id Photo"
                  name="picture"
                  onChange={this.handleChangePicture}
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
