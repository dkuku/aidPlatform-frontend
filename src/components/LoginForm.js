import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'
import { FormModal } from 'components'

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
}
function loginBody(email, password) {
  return {
    sign_in: {
      email: email,
      password: password,
    },
  }
}
class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  address = 'api/sign_in'
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleLoginSubmit = () => {
    const { email, password } = this.state
    axios
      .post(this.address, loginBody(email, password))
      .then(response => {
        if (response.status === 200) {
          this.setState({ modalHeader: `User created` })
        }
        this.setState({
          modalData: `You loggged in successfully`,
        })
        this.setState({
          modalButton: () => {
            this.props.history.push('/')
          },
        })
        this.props.login({ user: response.data.data.user })
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
        <FormModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleClose}
          modalHeader={this.state.modalHeader}
          modalContent={this.state.modalData}
          modalButton={this.state.modalButton}
        />
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
