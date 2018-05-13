import React, { Component } from 'react'
import { Grid, Menu, Header, Button, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMarkers, createConversation } from 'actions'
import { TaskDetails } from 'components'
import { ConversationsContainer } from 'containers'

class VolunteerContainer extends Component {
  constructor(props) {
    super(props)
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
  componentDidMount() {}
  volunteerRequest = () => this.props.createConversation(this.state.activeIndex, this.state.headers)

  onTaskSelect = selectedTask => {
    this.setState({ activeIndex: selectedTask })
    this.props.updateActiveIndex(selectedTask)
  }
  render() {
    const { activeIndex } = this.state
    const marker = this.props.markers.filter(obj => obj.id == activeIndex)[0]
    var name
    return (
      <Grid stackable columns={2}>
        <Grid.Column>
          {!(this.props.markers.length === 1) && (
            <TaskDetails
              marker={this.props.markers.filter(obj => obj.id == activeIndex)[0]}
              onTaskSelect={this.onTaskSelect}
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <ConversationsContainer />
        </Grid.Column>
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
  return bindActionCreators({ updateActiveIndex, getMarkers, getConversations, createConversation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerContainer)
