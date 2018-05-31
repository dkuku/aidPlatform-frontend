import React, {PureComponent} from 'react'
import {Form} from 'semantic-ui-react'

export default class MessageForm extends PureComponent {
  render(){
    return (
      <Form reply onSubmit={this.props.handleSendMessage.bind(this)}>
        <Form.Group unstackable inline>
          <Form.Input placeholder="Message" name="body" value={this.props.body} width='12' onChange={this.props.handleChange.bind(this)} />
          <Form.Button color="teal" width='4' content="Submit" />
        </Form.Group>
      </Form>

    )
  }
}
