import React, { Component } from 'react'
import { Item} from 'semantic-ui-react'

class TaskDetailsSimple extends Component {

  render() {
    const { title, id, task_type, description, done, fulfilment_counter, user_id } = this.props.marker

    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header as="h3">{title}</Item.Header>
            <Item.Meta>
              <span>Status: {done ? 'done' : 'waiting'}</span>
              <span> </span>
              <span>Type: {task_type}</span>
            </Item.Meta>
            <Item.Description>{description}</Item.Description>
            <Item.Extra>
              {this.props.children}
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}

export default TaskDetailsSimple
