import React, { PureComponent } from 'react'
import { Comment } from 'semantic-ui-react'

class Message extends PureComponent {
  render() {
    return (
      <Comment.Group>
        <Comment>
          <Comment.Content>
            <Comment.Author>{this.props.author}</Comment.Author>
            <Comment.Text>{this.props.message.body}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    )
  }
}
export default Message
