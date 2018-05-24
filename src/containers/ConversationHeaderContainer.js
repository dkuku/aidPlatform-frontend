import React, { PureComponent } from 'react'
import { Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ConversationHeaderContainer extends PureComponent {
  render() {
    return this.props.conversations.length == 0 ? (
      <div>
        <Header as="h3">
          {`Volunteer on this task `}
          <Button primary floated="right" onClick={this.props.handleVolunteer.bind(this)} disabled={this.props.done}>
            Volunteer
          </Button>
        </Header>
      </div>
    ) : (
      <div>
        <Header as="h3">
          {`Conversation with ${this.props.conversations[0].task_owner_name} `}
          <Button negative floated="right" onClick={this.props.handleDoneClick.bind(this)} disabled={this.props.done}>
            Mark task done
          </Button>
        </Header>
      </div>
    )
  }
}

export default ConversationHeaderContainer
