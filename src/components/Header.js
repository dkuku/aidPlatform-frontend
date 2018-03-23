import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Header extends Component {
  state = { activeItem: 'Login' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item name="Browse" active={activeItem === 'browse'} onClick={this.handleItemClick}>
          Browse
        </Menu.Item>

        <Menu.Item name="Search" active={activeItem === 'search'} onClick={this.handleItemClick}>
          Search
        </Menu.Item>

        <Menu.Item name="Newest" active={activeItem === 'newest'} onClick={this.handleItemClick}>
          Newest Requests
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Menu.Item name="Sign Up" active={activeItem === 'Signup'} onClick={this.handleItemClick} />
          </Menu.Item>
          <Menu.Item name="Login" active={activeItem === 'Login'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    )
  }
}
