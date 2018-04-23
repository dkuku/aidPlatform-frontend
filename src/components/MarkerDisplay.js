import React, { PureComponent } from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class MarkerDisplay extends PureComponent {
  render() {
    const { title, id, task_type, description, done, fulfilment_counter } = this.props.marker
    const color = task_type == 'material' ? 'blue' : 'green'
    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>
            {id}. {title}
          </Card.Header>
          <Card.Meta>
            <span>status: {done ? 'done' : 'waiting'}</span>
            <p>type: {task_type}</p>
          </Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/task/${id}`}>
            <Button basic floated="right" color={color}>
              Volunteer
            </Button>
          </Link>
        </Card.Content>
      </Card>
    )
  }
}

export default MarkerDisplay
