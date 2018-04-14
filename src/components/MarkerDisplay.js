import React, { PureComponent } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

class MarkerDisplay extends PureComponent {
  render() {
    const { title, description, done, fulfilment_counter } = this.props.marker
    return (
      <Card>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span>status: {done ? 'done' : 'waiting'}</span>
          </Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            {fulfilment_counter} users replied
          </a>
        </Card.Content>
      </Card>
    )
  }
}

export default MarkerDisplay
