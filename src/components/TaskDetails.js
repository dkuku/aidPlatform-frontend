import React, { PureComponent } from 'react'
import { Item } from 'semantic-ui-react'
import { FlickrPhoto, TaskButtonsOwner } from 'components'

class TaskDetails extends PureComponent {
  render() {
    const { title, id, task_type, description, done, fulfilment_counter, user_id } = this.props.marker

    const active = id === this.props.activeIndex
    const activeItem = active
      ? {
          padding: '1rem',
          borderRadius: '0.3rem',
          boxShadow: '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5',
        }
      : { padding: '1rem' }
    const color = task_type === 'material' ? 'blue' : 'green'

    return (
      <Item.Group onClick={this.props.onTaskSelect.bind(null, id)}>
        <Item style={activeItem}>
          <FlickrPhoto tags={title} />
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
    )
  }
}

export default TaskDetails
