import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as UserActions from 'actions/user'
import * as MarkerActions from 'actions/markers'
import { ActionCableProvider } from 'react-actioncable-provider'

class TopMenu extends PureComponent {
  render() {
    const isLoggedIn = Object.keys(this.props.user).length > 1 ? true : false
    const activeItem = 'login'
    const LoginLinks = isLoggedIn ? (
      <React.Fragment>
        <Menu.Item
          name="Add Task"
          active={activeItem === 'task'}
          onClick={() => {
            this.props.history.push('/add')
          }}
        />
        <Menu.Item
          name="Logout"
          active={activeItem === 'logout'}
          onClick={() => {
            this.props.history.push('/')
            this.props.logout()
          }}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Menu.Item
          name="Sign Up"
          active={activeItem === 'signup'}
          onClick={() => {
            this.props.history.push('/login/signup')
          }}
        />
        <Menu.Item
          name="Login"
          active={activeItem === 'login'}
          onClick={() => {
            this.props.history.push('/login')
          }}
        />
      </React.Fragment>
    )
    return (
      <Menu>
        <Menu.Item
          name="Home"
          active={activeItem === 'home'}
          onClick={() => {
            this.props.history.push('/')
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          name="Settings"
          active={activeItem === 'settings'}
          onClick={() => {
            this.props.history.push('/settings')
          }}
        >
          Settings
        </Menu.Item>

        <Menu.Menu position="right">
          {}
          {LoginLinks}
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    markers: state.markers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions, ...MarkerActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopMenu))
