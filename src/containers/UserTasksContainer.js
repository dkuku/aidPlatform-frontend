import React, { Component } from 'react'
import { Menu, Label, Button, Sidebar, Header, Segment } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { TaskDetails, TaskButtonsOwner } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from 'actions'

class UserTasksContainer extends Component {
  capitalize = s => s && s[0].toUpperCase() + s.slice(1)
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Toggle Menu</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
            <Menu.Item>
              <Menu.Header>Menu</Menu.Header>
            </Menu.Item>
            <Menu.Item
              name="Add Task"
              onClick={() => {
                this.props.history.push('/task')
              }}
            />
            <Menu.Item>
              <Menu.Menu>
                <Menu.Header>Show Tasks:</Menu.Header>
                <Menu.Item name={' '} />

                {Object.keys(this.props.tasks).map(title => (
                  <Menu.Item
                    key={title}
                    name={title}
                    id={title}
                    active={this.props.activeCategory == title}
                    onClick={this.props.handleItemClick.bind(this)}
                  >
                    {this.capitalize(title)}
                    <Label>{this.props.tasks[title].length}</Label>
                  </Menu.Item>
                ))}
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item
              name="Logout"
              onClick={() => {
                this.props.history.push('/')
                this.props.logout()
              }}
            />
          </Sidebar>
          <Sidebar.Pusher>
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
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { activeIndex: state.activeIndex }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTasksContainer))
