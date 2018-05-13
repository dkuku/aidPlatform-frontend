import React, { PureComponent } from 'react'
import { Item } from 'semantic-ui-react'
import { FlickrPhoto, TaskButtonsOwner } from 'components'

class TaskDetails extends PureComponent {
  render() {
    const { title, id, task_type, description, done, fulfilment_counter, user_id } = this.props.marker
    console.log(this.props)
    const active = id === this.props.activeIndex ? { border: '1px solid black' } : null
    const color = task_type === 'material' ? 'blue' : 'green'

    return (
      <Item.Group onClick={this.props.onTaskSelect.bind(null, id)}>
        <Item style={active}>
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
