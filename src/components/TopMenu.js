import React, { PureComponent, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'
import { Menu, Segment, Image } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as UserActions from 'actions/user'
import * as MarkerActions from 'actions/markers'
import { LOGO } from '../constants/Icons'

class TopMenu extends PureComponent {
  render() {
    const isLoggedIn = Object.keys(this.props.user).length > 1 ? true : false

    return (
      <Segment inverted style={{height:'80px'}}>
        <Menu inverted secondary>
          <Menu.Item
            header
            name="Home"
            onClick={() => {
              this.props.history.push('/')
            }}
          >
            <Image src={LOGO} size="mini" />
            Neighborhood
          </Menu.Item>
          {isLoggedIn&&
            <Fragment>
          <Menu.Item
            name="Dashboard"
            onClick={() => {
              this.props.history.push('/dashboard')
            }}
          >
            Dashboard
          </Menu.Item>

          <Menu.Menu position="right">
            {}
            <Menu.Item
              name="Add Task"
              onClick={() => {
                this.props.history.push('/task')
              }}
            />
          </Menu.Menu>
              </Fragment>}
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
