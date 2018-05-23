import React, { Component } from 'react'
import { Menu, Header, Button } from 'semantic-ui-react'

export default class TaskOwnerConvHeader extends Component {
  olderThanOneDay = () => {
    const taskDate = new Date(this.props.task.updated_at)
    const now = new Date()
    console.log(taskDate.getDate() + 1 > now.getDate())
    return taskDate.getDate() + 1 > now.getDate()
  }
  render() {

    const { conversations, task } = this.props
    const menuPlaceholder = !!conversations ? (
      <React.Fragment>
        <Header>Conversations for {task.title}</Header>
        <Button negative floated="right" onClick={this.props.handleDoneClick} disabled={task.done !== 0}>
          Mark task done
        </Button>
        {task.done !== 0 &&
          this.olderThanOneDay() && (
            <Button color="teal" floated="right" onClick={this.props.handleRepublishClick}>
              Republish Task
            </Button>
          )}
        <Menu compact attached="top" tabular>
          {this.props.conversations.map(conversation => (
            <Menu.Item
              key={conversation.id}
              name={this.props.activeConv == conversation.id?
                conversation.volunteer_name:
                (conversation.volunteer_name.substring(0,5)+'...')}
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

