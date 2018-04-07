import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from 'actions/user'
import { LoginForm, SignUpForm } from 'components'

class LoginContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/login" exact={true} component={LoginForm} />
        <Route path="/login/signup" component={SignUpForm} />
      </React.Fragment>
    )
  }
}

export default LoginContainer
