import React, { Component, Fragment } from 'react'
import { Menu, Label, Button, Sidebar, Header, Segment, Container, Icon, Portal } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { TaskDetails, TaskButtonsOwner, UserSettingsMenu } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout, messagesToggle, sidebarToggle, updateActiveIndex, getConversations } from 'actions'

class UserTasksContainer extends Component {

    componentDidUpdate(){
       (this.props.messageWindow!=(this.props.conversations.length>=1))? this.props.messagesToggle():null
    }
  onTaskSelect = selectedTask => {
    this.props.updateActiveIndex(selectedTask)
    this.props.getConversations(selectedTask, this.props.headers)
  }

  render() {
    const { sidebarVisible, messageWindow, ltm, tasks, activeCategory, logout, handleItemClick } = this.props
    return (
        <Sidebar.Pushable as={Segment} style={{ height: '100%' }}>
          <UserSettingsMenu
            top={ltm}
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
              {ltm&&<Fragment>{this.props.children}</Fragment>}
            <Segment basic
              style={{minHeight:"200px"}}>
              {this.props.tasks[this.props.activeCategory].map(marker => (
                <React.Fragment key={marker.id}>
                  <TaskDetails
                    marker={marker}
                    onTaskSelect={this.onTaskSelect}
                    active={this.props.activeIndex == marker.id}
                  />
                </React.Fragment>
              ))}
            </Segment>
          </Sidebar.Pusher>
        {!ltm&&
            <Portal open={this.props.messageWindow}>
              <Segment style={{background:"white", left: '50%', position: 'fixed', top: '160px', height: '60vh', maxWidth: '600px', zIndex: 1000 }} >
        {this.props.children}
              </Segment>
            </Portal>
        }
        </Sidebar.Pushable>
    )
  }
}
const mapStateToProps = state => {
  return {
    activeIndex: state.variables.activeIndex,
    ltm: state.browser.lessThan.medium,
    conversations: state.conversations,
    sidebarVisible: state.variables.sidebar,
    messageWindow: state.variables.messageWindow,
    headers: state.headers,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, sidebarToggle, messagesToggle, updateActiveIndex, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTasksContainer))
