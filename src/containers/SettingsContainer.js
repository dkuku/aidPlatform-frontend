import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMarkers } from 'actions'
import { TaskDetails } from 'components'
import { ConversationsContainer } from 'containers'

class SettingsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.state = {
      headers: { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } },
      activeIndex: this.props.activeIndex,
      activeConv: null,
      userMarkers: this.props.markers.filter(marker => marker.user_id == this.props.user.id),
    }
  }

  componentWillMount() {
    if (this.props.markers.length === 1) {
      this.props.getMarkers()
    }
  }

  componentDidMount() {}

  handleItemClick(e, { name }) {
    e.preventDefault()
    this.setState({ activeConv: name })
  }
  onTaskSelect = selectedTask => {
    this.setState({ activeIndex: selectedTask })
    this.props.updateActiveIndex(selectedTask)
  }

  render() {
    return (
      <Grid stackable columns={2}>
        <Grid.Column>
          {this.state.userMarkers.map(marker => (
            <TaskDetails
              key={marker.id}
              marker={marker}
              onTaskSelect={this.onTaskSelect}
              activeIndex={this.state.activeIndex}
            />
          ))}
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
    activeIndex: state.activeIndex,
    markers: state.markers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, getMarkers, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
