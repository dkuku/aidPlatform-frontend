import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class TaskList extends React.Component {
  state = {
    activeIndex: 0,
    markers: [],
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  componentDidMount() {
    const url = 'http://localhost:3000/api/v1/tasks'

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ markers: data.data.tasks })
      })
  }

  render() {
    const { activeIndex, markers } = this.state
    return (
      <Accordion fluid styled>
        {markers.map(marker => (
          <div>
            <Accordion.Title active={activeIndex === marker.id} index={marker.id} onClick={this.handleClick}>
              <Icon name="dropdown" />
              {marker.title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === marker.id}>
              <p>{marker.description}</p>
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    )
  }
}
