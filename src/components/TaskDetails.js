import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { MapSmall, TaskButtonsOwner } from 'components'
import { BLUE } from '../constants/Icons'

class TaskDetails extends Component {
  constructor() {
    super()
    this.state = { style: {} }
  }

  mouseOut() {
    this.setState({ style: { paddingLeft: '0rem' } })
  }
  mouseOver() {
    this.setState({ style: { paddingLeft: '1rem' } })
  }

  render() {
    const { marker, active } = this.props
    const { title, id, task_type, description, done, address } = marker
    return (
      <div
        onClick={this.props.onTaskSelect.bind(null, id)}
        style={active ? { background: 'rgba(0,0,0,0.1)', padding: '1rem' } : this.state.style}
        onMouseOver={() => this.mouseOver()}
        onMouseOut={() => this.mouseOut()}
      >
        <Item.Group relaxed>
          <Item>
            {!this.props.smallScreen &&
              active && (
                <Item.Image>
                  <MapSmall marker={marker} />
                </Item.Image>
              )}
            <Item.Content>
              {this.props.large && <Item.Image>
                <MapSmall height={'300px'} marker={marker} />
              </Item.Image>}
              <Item.Header style={{paddingTop: '10px'}}>{title}</Item.Header>
              <Item.Meta>
                <span>posted from: {address}</span>
              </Item.Meta>
              <Item.Description>{description}</Item.Description>
              <Item.Extra>
                <span>status: {done ? 'done' : 'waiting'}</span>
                <span>type: {task_type}</span>
                {this.props.children}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}

export default TaskDetails
