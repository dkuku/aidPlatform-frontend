import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as UserActions from 'actions/user'

class TopMenu extends Component {
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
        <Menu.Item name="Browse" active={activeItem === 'browse'} onClick={this.handleBrowseClick}>
          Browse
        </Menu.Item>

        <Menu.Item name="Search" active={activeItem === 'search'} onClick={this.handleSearchClick}>
          Search
        </Menu.Item>

        <Menu.Item name="Newest" active={activeItem === 'newest'} onClick={this.handleNewestClick}>
          Newest Requests
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopMenu))
