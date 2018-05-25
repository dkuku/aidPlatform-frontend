import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
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
    this.props.getUserMarkers(this.props.headers)
  }

  componentWillReceiveProps(){
    JSON.stringify(this.state.tasks) != JSON.stringify(this.props.tasks)? this.setState({tasks: this.props.tasks}): null
  }
  componentDidUpdate(){
    JSON.stringify(this.state.tasks) != JSON.stringify(this.props.tasks)? this.setState({tasks: this.props.tasks}): null
  }
  handleItemClick = (e, { id }) => {
    this.setState({ activeCategory: id })
  }

  onTaskSelect = selectedTask => {
    this.setState({ activeIndex: selectedTask })
    this.props.updateActiveIndex(selectedTask)
    this.props.getConversations(selectedTask, this.props.headers)
  }

  render() {
    const {activeCategory, activeIndex, tasks} = this.state
    const {getUserMarkers} = this.props
    return (
            <Container >
              <UserTasksContainer
                tasks={this.state.tasks}
                activeCategory={activeCategory}
                handleItemClick={this.handleItemClick}
                onTaskSelect={this.onTaskSelect}
                activeIndex={activeIndex}
              >
              <UserConversationsContainer id={activeIndex}/>
            </UserTasksContainer>
            </Container>
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
    tasks: state.userTasks,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, getUserMarkers, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
