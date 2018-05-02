import React, { PureComponent } from 'react'
import { Comment } from 'semantic-ui-react'
class Message extends PureComponent {
  render() {
    return (
      <Comment>
        <Comment.Avatar src={`https://robohash.org/${this.props.author}.png`} />
        <Comment.Content>
          <Comment.Author>{this.props.author}</Comment.Author>
          <Comment.Text>{this.props.message.body}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}
export default Message
