import React, { PureComponent } from 'react'
import { Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ConversationHeaderContainer extends PureComponent {
  render() {
    return this.props.conversations.length == 0 ? (
      0
    ) : (
      <Header as="h3">
        {`Conversation with ${this.props.name} `}
        <Button negative onClick={this.props.handleDoneClick.bind(this)} floated="right">
          Mark task done
        </Button>
      </Header>
    )
  }
}

export default ConversationHeaderContainer
