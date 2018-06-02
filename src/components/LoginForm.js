import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from 'actions'
import formHOC from 'components/formHOC'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sign_in: {
        email: '',
        password: '',
      },
    }
  }

  handleChange = (e, { name, value }) => this.setState({ sign_in: { ...this.state.sign_in, [name]: value } })

  handleLoginSubmit = () => {
    const { sign_in } = this.state
    console.log(this.state)
    this.props.login({ sign_in: sign_in })
  }

  render() {
    const { color } = this.props
    return (
      <Fragment>
        <Header as="h2" color={color} textAlign="center">
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

            <Button color={color} fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to={'/login/signup'}>Sign Up</Link>
        </Message>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(formHOC(LoginForm))
