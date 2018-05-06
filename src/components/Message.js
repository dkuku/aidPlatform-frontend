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
    return (
      <Comment style={this.props.owner ? inlineStyle.owner : {}}>
        <Comment.Avatar src={`https://robohash.org/${this.props.author}.png?size=50x50`} />
        <Comment.Content>
          <Comment.Author>{this.props.author}</Comment.Author>
          <Comment.Text>{this.props.message.body}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}
export default Message
