import React, { Component, Fragment } from 'react'
import { Menu, Label, Button, Sidebar, Header, Segment, Container, Icon, Portal } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { TaskDetails, UserSettingsMenu, TaskButtons, MessageForm } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout, messagesToggle, sidebarToggle, updateActiveIndex, getConversations, doneTask, getUserMarkers } from 'actions'

class UserTasksContainer extends Component {

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
        />
        <Sidebar.Pusher>
          <Segment>
            <Button icon basic color="teal" onClick={this.props.sidebarToggle}>
              <Icon name="bars" />
            </Button>
          </Segment>
          <Segment basic
                   style={{minHeight:"200px"}}>
            {this.props.tasks[this.props.activeCategory].map(marker => (
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
                      <Segment style={{background:"white", left: '50%', position: 'fixed', top: '160px', zIndex: 1000 }} >
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
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, doneTask, getUserMarkers, sidebarToggle, messagesToggle, updateActiveIndex, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTasksContainer))
