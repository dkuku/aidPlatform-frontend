import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu, Header, Button, Segment } from 'semantic-ui-react'
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
    this.handleItemClick = this.handleItemClick.bind(this)
    this.volunteerRequest = this.volunteerRequest.bind(this)
    this.state = {
      headers: { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } },
      activeConv: null,
      activeIndex: this.props.match.params.id,
    }
  }

  componentWillMount() {
    if (this.props.markers.length === 1) {
      this.props.getMarkers()
    }
  }
  componentDidMount() {
    const { headers, getConversations } = this.state
    this.props.getConversations(this.state.activeIndex, headers)
    this.setState({
      marker: this.props.markers.filter(obj => {
        obj.id == this.activeIndex
      })[0],
    })
  }
  componentDidUpdate() {}
  handleItemClick(e, { name }) {
    e.preventDefault()
    this.setState({ activeConv: name })
  }
  volunteerRequest = () => this.props.createConversation(this.state.activeIndex, this.state.headers)

  render() {
    const { activeConv, activeIndex } = this.state
    const { conversations, createConversation } = this.props.conversations
    const marker = this.props.markers.filter(obj => obj.id == activeIndex)[0]
    console.log(marker)
    var name
    console.log(this.props)
    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            {!(this.props.markers.length === 1) && (
              <MarkerDisplay marker={this.props.markers.filter(obj => obj.id == activeIndex)[0]} />
            )}
          </Grid.Column>
          <Grid.Column>
            <MessagesContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    conversations: state.conversations,
    activeIndex: state.activeIndex,
    markers: state.markers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...TaskActions, ...UserActions, ...ApiActions, ...ConversationsActions, ...Active },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerContainer)
