import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Header, Image, Segment, Container } from 'semantic-ui-react'

const Story = props => (
  <React.Fragment>
    <Header as="h3" style={{ fontSize: '2em' }}>
      {props.story.title}
    </Header>
    <Image rounded size="large" verticalAlign="middle" src={props.story.image} />
    <div style={{ fontSize: '1.33em' }}>
      <p> </p>
      <p>{props.story.body}</p>
    </div>
  </React.Fragment>
)
export default Story
