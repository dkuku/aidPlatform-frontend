import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { MapSmall, TaskButtonsOwner } from 'components'

class TaskDetails extends Component {
  render() {
    const { title, id, task_type, description, done } = this.props.marker

    return (
      <div onClick={this.props.onTaskSelect.bind(null, id)}>
        {this.props.active && <MapSmall marker={this.props.marker} />}
        <Item.Group relaxed>
          <Item>
            <Item.Content>
              <Item.Header>{title}</Item.Header>
              <Item.Meta>
                <span>status: {done ? 'done' : 'waiting'}</span>
                <span>type: {task_type}</span>
              </Item.Meta>
              <Item.Description>{description}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}

export default TaskDetails
