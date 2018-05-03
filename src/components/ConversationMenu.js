import React, { PureComponent } from 'react'
import { Menu, Header } from 'semantic-ui-react'

export default class ConversationMenu extends PureComponent {
  render() {
    console.log(this.props)
    const menuPlaceholder = !!this.props.conversations ? (
      <Menu attached="top" tabular>
        {this.props.conversations.map(conversation => (
          <Menu.Item
            key={conversation.id}
            name={conversation.volunteer_name}
            active={this.props.activeConv === conversation.volunteer_name}
            onClick={this.handleItemClick}
          />
        ))}
      </Menu>
    ) : (
      <Header>No conversation for this task</Header>
    )

    return <React.Fragment>{menuPlaceholder}</React.Fragment>
  }
}
