import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'
import * as TaskActions from 'actions/markers'
import * as Active from 'actions/activeIndex'
import { MarkerDisplay } from 'components'

class VolunteerContainer extends Component {
  render() {
    const id = this.props.match.params.id || 0
    this.props.updateActiveIndex(id)
    var marker = this.props.markers.filter(function(obj) {
      return obj.id == id
    })

    return <MarkerDisplay marker={marker[0]} />
  }
}

const mapStateToProps = state => {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TaskActions, ...UserActions, ...Active }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerContainer)
