import React, { Component } from 'react'
import { Grid, Menu, Header, Button, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { updateActiveIndex, getConversations, getMarkers, createConversation,  } from 'actions'
import { TaskDetails } from 'components'
import { UserConversationsContainer } from 'containers'

class VolunteerContainer extends Component {
  constructor(props) {
    super(props)
    this.volunteerRequest = this.volunteerRequest.bind(this)
    this.state = {
      activeConv: null,
    }
  }

  componentWillMount() {
    if (this.props.match.params.id !== this.props.activeIndex) {
      this.props.updateActiveIndex(this.props.match.params.id)
    }
    this.props.getConversations(this.props.activeIndex, this.props.headers)
  }
  componentDidMount() {}
  volunteerRequest = () => {
    this.props.createConversation(this.props.activeIndex, this.props.headers)
  }

  componentDidUpdate(){
    if (this.props.match.params.id != this.props.activeIndex) {
      this.props.updateActiveIndex(this.props.match.params.id)
      this.props.getConversations(this.props.activeIndex, this.props.headers)
    }
  }

  onTaskSelect = selectedTask => {
    this.setState({ activeIndex: selectedTask })
    this.props.updateActiveIndex(selectedTask)
  }
  render() {
    const { activeIndex, currentTask, conversations } = this.props
    return (
      <Grid container stackable columns={2} style={{ }}>
        <Grid.Column>
          {!!currentTask.id && (
            <TaskDetails marker={currentTask} onTaskSelect={this.onTaskSelect} large={true} />
          )}
        </Grid.Column>
        <Grid.Column>
          {this.props.currentTask.id == this.props.user.id?
            <Header>This task was posted by you</Header>:
            !!conversations.length > 0 ?
            <UserConversationsContainer />
            :
            <div>
              <Header as="h3">
                {`Volunteer on this task `}
                <Button color={'teal'} floated="right" onClick={this.volunteerRequest} disabled={currentTask.done>0}>
                  Volunteer
                </Button>
              </Header>
            </div>}
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    headers: state.headers,
    conversations: state.conversations,
    activeIndex: state.variables.activeIndex,
    markers: state.markers,
    currentTask: state.currentTask,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, getMarkers, getConversations, createConversation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VolunteerContainer))
