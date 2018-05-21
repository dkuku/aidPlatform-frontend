import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'
import { Menu, Segment, Image } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as UserActions from 'actions/user'
import * as MarkerActions from 'actions/markers'
import { ActionCableProvider } from 'react-actioncable-provider'
import { LOGO } from '../constants/Icons'

class TopMenu extends PureComponent {
  render() {
    const isLoggedIn = Object.keys(this.props.user).length > 1 ? true : false
    const activeItem = 'login'

    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item
            header
            name="Home"
            active={activeItem === 'home'}
            onClick={() => {
              this.props.history.push('/')
            }}
          >
            <Image src={LOGO} size="mini" />
            Neighborhood
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
            <Menu.Item
              name="Add Task"
              active={activeItem === 'task'}
              onClick={() => {
                this.props.history.push('/task')
              }}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
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
