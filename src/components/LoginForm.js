import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from 'actions/user'

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
}
function loginBody(email, password) {
  return JSON.stringify({
    sign_in: {
      email: email,
      password: password,
    },
  })
}

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleLoginSubmit = () => {
    fetch('api/sign_in', {
      method: 'post',
      headers: headers,
      body: loginBody(this.state.email, this.state.password),
    })
      .then(res => res.json())
      .then(data => {
        this.props.login({ user: data.data.user })
      })

    this.props.history.push('/')
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
              {/*<Image src='/logo.png' />*/} Log-in to your account
            </Header>
            <Form size="large" onSubmit={this.handleLoginSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="Email Address"
                  placeholder="E-mail address"
                  name="email"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to={'/login/signup'}>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))
