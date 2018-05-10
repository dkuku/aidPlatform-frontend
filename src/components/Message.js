import React, { PureComponent } from 'react'
import { Comment } from 'semantic-ui-react'

const inlineStyle = {
  owner: {
    background: 'rgb(225, 225, 225)',
    paddingBottom: '0.2em',
  },
}
class Message extends PureComponent {
  render() {
    const { owner, author, message } = this.props
    return (
      <Comment style={owner ? inlineStyle.owner : {}}>
        <Comment.Avatar src={`https://robohash.org/${author}.png?size=50x50`} />
        <Comment.Content>
          <Comment.Author>{author}</Comment.Author>
          <Comment.Text>{message.body}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}
export default Message
