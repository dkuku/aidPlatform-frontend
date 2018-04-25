import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'
import * as TaskActions from 'actions/markers'
import * as Active from 'actions/activeIndex'
import { MarkerDisplay } from 'components'
import { MessagesContainer } from 'containers'

class SettingsContainer extends Component {
  render() {
    const id = this.props.match.params.id || 0
    this.props.updateActiveIndex(id)
    const marker = this.props.markers.filter(function(obj) {
      return obj.id == id
    })
    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>{/*
     <MarkerDisplay marker={marker[0]} />
    
    */}</Grid.Column>
          <Grid.Column>
            <MessagesContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TaskActions, ...UserActions, ...Active }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
