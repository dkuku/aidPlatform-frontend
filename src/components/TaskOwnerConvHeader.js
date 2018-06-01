import React, { Component } from 'react'
import { Menu, Header, Button } from 'semantic-ui-react'

export default class TaskOwnerConvHeader extends Component {
  render() {
    const { conversations, task, volunteer } = this.props
    const nameToDisplay = volunteer? 'task_owner_name': 'volunteer_name'
    const menuPlaceholder = !!conversations ? (
      <React.Fragment>
        <Menu compact attached="top" tabular>
          {this.props.conversations.map(conversation => (
            <Menu.Item
              key={conversation.id}
              name={
                this.props.activeConv == conversation.id
                  ? conversation[nameToDisplay]
                  : conversation[nameToDisplay].split(" ")[0]
              }
              id={conversation.id}
              active={this.props.activeConv == conversation.id}
              onClick={this.props.handleItemClick.bind(this)}
            />
          ))}
        </Menu>
      </React.Fragment>
    ) : (
      <Header>
        No conversation for this task
        <Button>Volunteer</Button>
      </Header>
    )

    return <React.Fragment>{menuPlaceholder}</React.Fragment>
  }
}
