import React, { Component, Fragment } from 'react'
import { Menu, Label, Button, Sidebar, Header, Segment, Container, Icon, Portal } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { TaskDetails, UserSettingsMenu, TaskButtons, MessageForm } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout, messagesToggle, sidebarToggle, updateActiveIndex, getConversations, doneTask, getUserMarkers } from 'actions'
import {capitalize} from 'constants/functions'

class UserTasksContainer extends Component {

  componentDidUpdate() {
    if (this.props.tasks[this.props.activeCategory].length === 1)
      this.props.updateActiveIndex(this.props.tasks[this.props.activeCategory][0].id)
  }
  onTaskSelect = selectedTask => {
    this.props.updateActiveIndex(selectedTask)
    this.props.getConversations(selectedTask, this.props.headers)
  }

   handleDoneClick = (id) =>{
    this.props.doneTask(id, this.props.headers)
    this.props.getUserMarkers(this.props.headers)
  }
  handleOpenMessages = () =>{
    this.props.messagesToggle()
  }

  handleRepublishClick = (task) =>
    this.props.history.push({
      pathname: '/task',
      state: { ...task, done: 0 },
    })
  render() {
    const { sidebarVisible, messageWindow, smallScreen, tasks, activeCategory, logout, handleItemClick, user } = this.props
    return (
      <Sidebar.Pushable as={Segment} style={{ height: '100%' }}>
        <UserSettingsMenu
          top={smallScreen}
          toggleVisibility={this.props.sidebarToggle}
          tasks={tasks}
          handleItemClick={handleItemClick}
          logout={logout}
          visible={sidebarVisible}
          activeCategory={activeCategory}
        />
        <Sidebar.Pusher>
          <Segment textAlign='center'>
            <Button icon basic color="teal" floated='left' onClick={this.props.sidebarToggle}>
              <Icon name="bars" />
            </Button>
          <Header as={'span'} size='large' >
            {capitalize(activeCategory) + " Tasks"}
          </Header>
          </Segment>
          <Segment basic
                   style={{minHeight:"205px"}}>
            {tasks[activeCategory].map(marker => (
              <React.Fragment key={marker.id}>
                {this.props.activeIndex == marker.id &&
                <React.Fragment>
                  <TaskDetails
                    marker={marker}
                    onTaskSelect={this.onTaskSelect}
                    active={true}
                    smallScreen={smallScreen}
                  >
                  <TaskButtons
                    handleOpenMessages={this.handleOpenMessages}
                    messages={this.props.conversations.length > 0}
                    handleDoneClick={this.handleDoneClick}
                    handleRepublishClick={this.handleRepublishClick}
                    task={marker}
                    user={user}
                   />
                  </TaskDetails>

                  {smallScreen?<Fragment>{this.props.children}</Fragment>:
                    <Portal open={this.props.messageWindow}>
                      <Segment style={{background:"white",minWidth: '450px', position:"fixed",bottom: '10vh', left: '40%', zIndex: 1000 }} >
                        {this.props.children}
                      </Segment>
                    </Portal>
                  }
                </React.Fragment>
            }
              </React.Fragment>
            ))}

            {this.props.tasks[this.props.activeCategory].map(marker => (
              <React.Fragment key={marker.id}>
                {this.props.activeIndex != marker.id &&
                  <TaskDetails
                    marker={marker}
                    onTaskSelect={this.onTaskSelect}
                    active={false}
                  />
                }
              </React.Fragment>
            ))}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}
const mapStateToProps = state => {
  return {
    activeIndex: state.variables.activeIndex,
    smallScreen: state.browser.lessThan.medium,
    conversations: state.conversations,
    sidebarVisible: state.variables.sidebar,
    messageWindow: state.variables.messageWindow,
    headers: state.headers,
    converations: state.conversations,
    user: state.user,
    activeCategory: state.variables.activeCategory
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, doneTask, getUserMarkers, sidebarToggle, messagesToggle, updateActiveIndex, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTasksContainer))
