import React from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import Message from '../components/Message'

const MessagesContainer = conversation => (
  <React.Fragment>
    {JSON.stringify(conversation)}
    <Message />
    <Form reply>
      <Form.TextArea />
      <Button content="Add Reply" labelPosition="left" icon="edit" primary />
    </Form>
  </React.Fragment>
)

export default MessagesContainer
