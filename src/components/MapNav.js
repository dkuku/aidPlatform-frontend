import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'

export default class MapNav extends Component {
  state = { activeItem: 'hands' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu attached="top" tabular>
          <Menu.Item name="hands" active={activeItem === 'hands'} onClick={this.handleItemClick} />
          <Menu.Item name="items" active={activeItem === 'items'} onClick={this.handleItemClick} />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input transparent icon={{ name: 'search', link: true }} placeholder="Search users..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
