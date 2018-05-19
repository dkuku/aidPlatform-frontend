import React, { Component } from 'react'
import { Menu, Label, Button, Sidebar, Header, Segment } from 'semantic-ui-react'
import { TaskDetails, TaskButtonsOwner } from 'components'

export default class UserTasksHeader extends Component {
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
            {Object.keys(this.props.tasks).map(title => (
              <Menu.Item
                key={title}
                name={title}
                id={title}
                active={this.props.activeCategory == title}
                onClick={this.props.handleItemClick.bind(this)}
              >
                {this.capitalize(title)}
                <Label>{title.length}</Label>
              </Menu.Item>
            ))}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as="h3">Application Content</Header>
              {this.props.tasks[this.props.activeCategory].map(marker => (
                <React.Fragment key={marker.id}>
                  <TaskDetails
                    marker={marker}
                    onTaskSelect={this.props.onTaskSelect.bind(this)}
                    activeIndex={this.state.activeIndex}
                  />
                  <TaskButtonsOwner />
                  <div />
                </React.Fragment>
              ))}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
