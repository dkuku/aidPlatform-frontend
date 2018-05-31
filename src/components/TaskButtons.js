import React, { Fragment, PureComponent } from "react";
import {Button} from 'semantic-ui-react'

export default class TaskButtons extends PureComponent {
  olderThanOneDay = (date) => {
    const taskDate = new Date(date)
    const now = new Date()
    console.log(taskDate.getDate(), now.getDate())
    return (taskDate.getDate() + 1 > now.getDate())
  }
  render() {
    const {task, messages} = this.props
    return (
      <div>
        <Button.Group floated="right" >
          <Button primary onClick={this.props.handleOpenMessages.bind(this)} disabled={!messages}>
            Conversations
          </Button>
          <Button color={"pink"} onClick={this.props.handleDoneClick.bind(this, task.id)} disabled={task.done !== 0}>
            Mark done
          </Button>
          {task.done != 0 &&
          !this.olderThanOneDay(task.updated_at) &&this.props.task.user_id == this.props.user.id &&
          <Button color={"teal"} onClick={this.props.handleRepublishClick.bind(this, task)}>
            Republish
          </Button>
          }
        </Button.Group>
      </div>

    )
  }
}
