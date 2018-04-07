import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as UserActions from 'actions/user'

class TopMenu extends Component {
  static propTypes = {
    login: Proptypes.func.isRequired,
    logout: Proptypes.func.isRequired,
  }
  handleLoginClick = () => {
    this.props.history.push('/login')
  }

  handleSignupClick = () => {
    this.props.history.push('/login/signup')
  }

  handleLogoutClick = () => {
    this.props.logout()
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    console.log(Object.keys(this.props.user).length)
    const isLoggedIn = Object.keys(this.props.user).length > 1 ? true : false
    const activeItem = 'login'

    const LoginLinks = isLoggedIn ? (
      <Menu.Item name="Logout" active={activeItem === 'logout'} onClick={this.handleLogoutClick} />
    ) : (
      <React.Fragment>
        <Menu.Item name="Sign Up" active={activeItem === 'signup'} onClick={this.handleSignupClick} />
        <Menu.Item name="Login" active={activeItem === 'login'} onClick={this.handleLoginClick} />
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
