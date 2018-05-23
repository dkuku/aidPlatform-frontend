import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { updateActiveIndex, getConversations, getUserMarkers } from 'actions'
import { TaskDetails, TaskButtonsOwner } from 'components'
import { UserConversationsContainer, UserTasksContainer } from 'containers'
import {api as url, WS} from '../constants/variables'

class SettingsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: null,
      activeCategory: 'unfulfiled',
      tasks: {
        unfulfiled: [],
        fulfiled: [],
        active: [],
        closed: [],
      },
    }
  }

  componentWillMount() {
    axios.get(url + 'tasks', this.props.headers).then(response => {
      this.setState({
        tasks: response.data.data.tasks,
      })
    })
  }

  componentDidMount() {}

  handleItemClick = (e, { id }) => {
    this.setState({ activeCategory: id })
  }

  onTaskSelect = selectedTask => {
    this.setState({ activeIndex: selectedTask })
    this.props.updateActiveIndex(selectedTask)
    this.props.getConversations(selectedTask, this.props.headers)
  }

  render() {
    return (
      <React.Fragment>
        {/*mobile desktop switch*/}
        {this.props.ltm ? (
          <React.Fragment>
            <UserTasksContainer
              tasks={this.state.tasks}
              activeCategory={this.state.activeCategory}
              handleItemClick={this.handleItemClick}
              onTaskSelect={this.onTaskSelect}
              activeIndex={this.state.activeIndex}
            >
              <UserConversationsContainer id={String(this.state.activeIndex)} />
            </UserTasksContainer>
          </React.Fragment>
        ) : (
          <Grid container>
          <Grid.Row columns={2}>
            <Grid.Column>
              <UserTasksContainer
                tasks={this.state.tasks}
                activeCategory={this.state.activeCategory}
                handleItemClick={this.handleItemClick}
                onTaskSelect={this.onTaskSelect}
                activeIndex={this.state.activeIndex}
              />
            </Grid.Column>
            <Grid.Column>
              <UserConversationsContainer id={String(this.state.activeIndex)} />
            </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    headers: state.headers,
    user: state.user,
    activeIndex: state.activeIndex,
    markers: state.markers,
    ltm: state.browser.lessThan.medium,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, getUserMarkers, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
