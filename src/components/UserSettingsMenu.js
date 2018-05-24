import React, { Component } from 'react'
import { Sidebar, Menu, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class UserSettingsMenu extends Component {
  capitalize = s => s && s[0].toUpperCase() + s.slice(1)
  render() {
    const { top, logout, toggleVisibility, visible, history, tasks, activeCategory, handleItemClick } = this.props
    return (
      <Sidebar
        as={Menu}
        vertical
        animation="push"
        fluid={top}
        width="thin"
        direction={top ? 'top' : 'left'}
        visible={visible}
        icon="labeled"
      >
        <Menu.Item onClick={toggleVisibility.bind(this)}>Close Menu</Menu.Item>
        <Menu.Item
          name="Add Task"
          onClick={() => {
            history.push('/task')
          }}
        />
        <Menu.Item>
          <Menu.Menu>
            <Menu.Header>Show Tasks:</Menu.Header>
            <Menu.Item name={' '} />

            {Object.keys(tasks).map(title => (
              <Menu.Item
                key={title}
                name={title}
                id={title}
                active={activeCategory == title}
                onClick={handleItemClick.bind(this)}
              >
                {this.capitalize(title)}
                <Label>{tasks[title].length}</Label>
              </Menu.Item>
            ))}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item
          name="Logout"
          onClick={() => {
            history.push('/')
            logout().bind(this)
          }}
        />
      </Sidebar>
    )
  }
}

export default withRouter(UserSettingsMenu)
