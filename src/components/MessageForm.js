import React, {PureComponent} from 'react'
import {Form} from 'semantic-ui-react'

export default class MessageForm extends PureComponent {
  render(){
    return (
      <Form reply onSubmit={this.props.handleSendMessage.bind(this)}>
        <Form.Group>
          <Form.Input placeholder="Message" name="body" value={this.props.body} onChange={this.props.handleChange.bind(this)} />
          <Form.Button content="Submit" />
        </Form.Group>
      </Form>

    )
  }
}
