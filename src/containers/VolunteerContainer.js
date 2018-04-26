import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'
import * as TaskActions from 'actions/markers'
import * as ApiActions from 'actions/apiActions'
import * as ConversationsActions from 'actions/conversationsActions'
import * as Active from 'actions/activeIndex'
import { MarkerDisplay } from 'components'
import { MessagesContainer } from 'containers'

class VolunteerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: Number(this.props.match.params.id),
      marker: this.props.markers.filter(obj => {
        obj.id == this.props.match.params.id
      })[0],
    }
  }
  componentDidMount() {
    console.log(this.state)
    const headers = { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } }
    console.log(headers)
    this.props.getConversations(this.state.id, headers)
  }
  render() {
    const marker = this.props.markers.filter(obj => {
      obj.id == this.state.id
    })[0]
    this.props.updateActiveIndex(this.state.id)
    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>{/*
           <MarkerDisplay marker={this.marker} />
          */}</Grid.Column>
          <Grid.Column>
            {this.props.conversationsReducers.map(conversation => <MessagesContainer conversation={conversation} />)}
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
  return bindActionCreators(
    { ...TaskActions, ...UserActions, ...ApiActions, ...ConversationsActions, ...Active },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerContainer)
