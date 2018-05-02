import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'
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
      headers: { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } },
      activeConv: null,
      id: this.props.match.params.id,
      marker: this.props.markers.filter(obj => {
        obj.id == this.props.match.params.id
      })[0],
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeConv: name })

  componentWillMount() {
    console.log(this.props.markers.length)
    if (this.props.markers.length === 1) {
      this.props.getMarkers()
    }
  }
  componentDidMount() {
    const { headers, getConversations } = this.state
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
          <Grid.Column>
            {!(this.props.markers.length === 1) && (
              <MarkerDisplay marker={this.props.markers.filter(obj => obj.id == this.state.id)[0]} />
            )}
          </Grid.Column>
          <Grid.Column>
            <Menu attached="top" tabular>
              {this.props.conversations.map(conversation => (
                <Menu.Item
                  key={conversation.id}
                  name={conversation.volunteer_name}
                  active={this.state.activeConv === conversation.volunteer_name}
                  onClick={this.handleItemClick}
                />
              ))}
            </Menu>
            {this.props.conversations.map(
              conversation =>
                conversation.volunteer_name === this.state.activeConv && (
                  <MessagesContainer key={conversation.id} headers={this.state.headers} conversation={conversation} />
                )
            )}
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
