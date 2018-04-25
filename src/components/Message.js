import React, { Component } from 'react'
import { Comment } from 'semantic-ui-react'

class Message extends Component {
  render() {
    return (
      <Comment.Group>
        <Comment>
          <Comment.Avatar as="a" src="/assets/images/avatar/small/joe.jpg" />
          <Comment.Content>
            <Comment.Author>Tom Lukic</Comment.Author>
            <Comment.Text>This will be great for business reports. I will definitely download this.</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    )
  }
}

export default Message
