import React, { Component, Fragment } from 'react'
import { Menu, Label, Button, Sidebar, Header, Segment, Container, Icon, Portal } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { TaskDetails, TaskButtonsOwner, UserSettingsMenu } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from 'actions'

class UserTasksContainer extends Component {
    state = { visible: false,
              conversation:false
    }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
    componentDidUpdate(){
        console.log(this.props.conversations.length);
       (this.state.conversation!=(this.props.conversations.length>=1))? this.setState({conversation:(this.props.conversations.length>=1)}):null
    }
  render() {
    const { visible, conversation } = this.state
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
              {ltm&&<Fragment>{this.props.children}</Fragment>}
            <Segment basic
              style={{minHeight:"200px"}}>
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
        {!ltm&&
            <Portal open={conversation}>
              <Segment style={{background:"white", left: '20vh', position: 'fixed', top: '15vh', height: '60vh', maxWidth: '600px', zIndex: 1000 }} >
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
    activeIndex: state.activeIndex,
    ltm: state.browser.lessThan.medium,
    conversations: state.conversations,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTasksContainer))
