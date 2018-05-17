import React, { Component } from 'react'
import { Menu, Header, Button } from 'semantic-ui-react'

export default class TaskOwnerConvHeader extends Component {
  render() {
    console.log(this.props)
    const menuPlaceholder = !!this.props.conversations ? (
      <Menu attached="top" tabular>
        {this.props.conversations.map(conversation => (
          <Menu.Item
            key={conversation.id}
            name={conversation.volunteer_name}
            id={conversation.id}
            active={this.props.activeConv == conversation.id}
            onClick={this.props.handleItemClick.bind(this)}
          />
        ))}
      </Menu>
    ) : (
      <Header>
        No conversation for this task
        <Button>Volunteer</Button>
      </Header>
    )

    return <React.Fragment>{menuPlaceholder}</React.Fragment>
  }
}
