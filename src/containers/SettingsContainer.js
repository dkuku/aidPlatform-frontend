import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMarkers } from 'actions'
import { TaskDetails, TaskButtonsOwner } from 'components'
import { UserConversationsContainer } from 'containers'

const url = process.env.REACT_APP_API

class SettingsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } },
      activeIndex: this.props.activeIndex,
      activeConv: null,
      userMarkers: this.props.markers.filter(marker => marker.user_id == this.props.user.id),
    }
  }

  componentWillReceiveProps() {
    this.setState({
      userMarkers: this.props.markers.filter(marker => marker.user_id == this.props.user.id),
    })
  }
  componentWillMount() {
    if (this.props.markers.length === 1) {
      this.props.getMarkers()
    }
  }

  componentDidMount() {}

  onTaskSelect = selectedTask => {
    this.setState({ activeIndex: selectedTask })
    this.props.updateActiveIndex(selectedTask)
    this.props.getConversations(selectedTask, this.props.headers)
  }

  render() {
    return (
      <Grid stackable columns={2}>
        <Grid.Column>
          {this.state.userMarkers.map(marker => (
            <React.Fragment key={marker.id}>
              <TaskDetails marker={marker} onTaskSelect={this.onTaskSelect} activeIndex={this.state.activeIndex} />
              <TaskButtonsOwner />
            </React.Fragment>
          ))}
        </Grid.Column>
        <Grid.Column>
          <UserConversationsContainer id={String(this.state.activeIndex)} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    headers: state.headers,
    user: state.user,
    activeIndex: state.activeIndex,
    markers: state.markers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, getMarkers, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
