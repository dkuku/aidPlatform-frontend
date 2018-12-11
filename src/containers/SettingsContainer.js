import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  updateActiveIndex,
  updateActiveCategory,
  getConversations,
  getUserMarkers,
  messagesToggle,
  sidebarToggle,
} from 'actions'
import { TaskDetails, TaskButtonsOwner } from 'components'
import { UserConversationsContainer, UserTasksContainer } from 'containers'
import { api as url, WS } from '../constants/variables'

class SettingsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.getUserMarkers(this.props.headers)
  }

  componentWillReceiveProps() {
    if (JSON.stringify(this.state.tasks) != JSON.stringify(this.props.tasks)) {
      this.setState({ tasks: this.props.tasks })
    }
  }
  componentDidUpdate() {
    if (JSON.stringify(this.state.tasks) != JSON.stringify(this.props.tasks)) {
      this.setState({ tasks: this.props.tasks })
    }
  }
  handleItemClick = (e, { id }) => {
    this.props.updateActiveCategory(id)
    this.props.sidebarToggle()
  }
  volunteerInHeader = () =>
    this.props.activeCategory == 'active' || this.props.activeCategory == 'closed' ? true : false
  render() {
    const { tasks } = this.state
    const { getUserMarkers, activeCategory, activeIndex } = this.props
    return (
      <Container>
        <UserTasksContainer
          tasks={this.state.tasks}
          activeCategory={activeCategory}
          handleItemClick={this.handleItemClick}
          onTaskSelect={this.onTaskSelect}
          activeIndex={activeIndex}
        >
          <UserConversationsContainer volunteer={this.volunteerInHeader()} closeButton={true} />
        </UserTasksContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    headers: state.headers,
    user: state.user,
    activeIndex: state.variables.activeIndex,
    activeCategory: state.variables.activeCategory,
    markers: state.markers,
    smallScreen: state.browser.lessThan.medium,
    tasks: state.userTasks,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { sidebarToggle, updateActiveIndex, getUserMarkers, getConversations, messagesToggle, updateActiveCategory },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer)
