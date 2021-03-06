import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from 'actions/user'
import formHOC from 'components/formHOC'

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
      <Fragment>
        <Header as="h2" color={this.props.color} textAlign="center">
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
            <Button color={this.props.color} fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to={'/login'}>Login</Link>
        </Message>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(formHOC(SignUpForm))
