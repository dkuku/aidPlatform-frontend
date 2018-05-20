import React, { PureComponent } from 'react'
import { Item, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TaskDetailsSimple extends PureComponent {
  render() {
    const { title, id, task_type, description, done, fulfilment_counter, user_id } = this.props.marker
    const color = task_type === 'material' ? 'blue' : 'green'

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
              <Link to={`/task/${id}`}>
                <Button basic floated="right" color={color}>
                  View task
                </Button>
              </Link>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}

export default TaskDetailsSimple
