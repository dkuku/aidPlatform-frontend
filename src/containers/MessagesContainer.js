import React from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import Message from '../components/Message'

const MessagesContainer = () => (
  <React.Fragment>
    <Message />
    <Form reply>
      <Form.TextArea />
      <Button content="Add Reply" labelPosition="left" icon="edit" primary />
    </Form>
  </React.Fragment>
)

export default MessagesContainer
