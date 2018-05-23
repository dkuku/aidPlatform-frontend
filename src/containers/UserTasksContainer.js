import React, { Component } from 'react'
import { Menu, Label, Button, Sidebar, Header, Segment, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { TaskDetails, TaskButtonsOwner, UserSettingsMenu } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from 'actions'

class UserTasksContainer extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const { toggleVisibility, ltm, tasks, activeCategory, logout, handleItemClick } = this.props
    return (
        <Sidebar.Pushable as={Segment} style={{ height: '100%' }}>
          <UserSettingsMenu
            top={ltm}
            toggleVisibility={this.toggleVisibility}
            tasks={tasks}
            handleItemClick={handleItemClick}
            logout={logout}
            visible={visible}
          />
          <Sidebar.Pusher>
            <Segment>
              <Button icon basic color="teal" onClick={this.toggleVisibility}>
                <Icon name="bars" />
                </Button>
            </Segment>
              {this.props.children}              
            <Segment basic>
              {this.props.tasks[this.props.activeCategory].map(marker => (
                <React.Fragment key={marker.id}>
                  <TaskDetails
                    marker={marker}
                    onTaskSelect={this.props.onTaskSelect.bind(this)}
                    active={this.props.activeIndex == marker.id}
                  />
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
    activeIndex: state.activeIndex,
    ltm: state.browser.lessThan.medium,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTasksContainer))
