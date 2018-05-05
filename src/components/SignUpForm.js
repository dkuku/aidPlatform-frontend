import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'
import { Upload } from 'components'

class SignUpForm extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
      },
    }
  }
  handleChange = (e, { name, value }) =>
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    })

  handleSignUpSubmit = () => {
    const { user } = this.state
    this.props.signup({ user: user })
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
