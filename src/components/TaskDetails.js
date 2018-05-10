import React, { PureComponent } from 'react'
import { Item, Grid, Button } from 'semantic-ui-react'
import { FlickrPhoto, TaskButtonsOwner } from 'components'
import { Link } from 'react-router-dom'

class TaskDetails extends PureComponent {
  render() {
    const { title, id, task_type, description, done, fulfilment_counter, user_id } = this.props.marker
    const color = task_type === 'material' ? 'blue' : 'green'

    return (
      <Item.Group>
        <Item>
          <FlickrPhoto tags={title} />
          <Item.Content>
            <Item.Header>{title}</Item.Header>
            <Item.Meta>
              <span>status: {done ? 'done' : 'waiting'}</span>
              <span>type: {task_type}</span>
            </Item.Meta>
            <Item.Description>{description}</Item.Description>
            <Item.Extra>
              <TaskButtonsOwner />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}

export default TaskDetails
