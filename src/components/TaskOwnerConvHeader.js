import React, { PureComponent } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TaskOwnerConvHeader extends PureComponent {
  render() {
    return (
      <Button.Group>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    )
  }
}

export default TaskOwnerConvHeader
