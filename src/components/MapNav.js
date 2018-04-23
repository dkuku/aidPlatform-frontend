import React, { Component } from 'react'
import { Input, Menu, Segment, Button, Dropdown } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FilterActions from '../actions/filters'

class MapNav extends Component {
  state = {
    activeItem: 'help',
    activeTime: '7',
  }

  handleClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.setFilterType(name)
  }
  handleClickDate = (e, { name }) => {
    this.setState({ activeTime: name })
    this.props.setFilterDate(name)
  }
  render() {
    const { activeItem, activeTime, filter } = this.state

    return (
      <div>
        <Menu attached="top" tabular>
          I want to see:
          <Menu.Item name="all" active={activeItem === 'all'} onClick={this.handleClick} />
          <Menu.Item name="help" active={activeItem === 'help'} onClick={this.handleClick} />
          <Menu.Item name="material" active={activeItem === 'material'} onClick={this.handleClick} />
          tasks published in:
          <Menu.Item name="1" active={activeTime === '1'} onClick={this.handleClickDate} />
          <Menu.Item name="7" active={activeTime === '7'} onClick={this.handleClickDate} />
          <Menu.Item name="30" active={activeTime === '30'} onClick={this.handleClickDate} />
          <Menu.Item>
            <Input transparent icon={{ name: 'search', link: true }} placeholder="Search users..." />
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    state,
    taskFilter: state.taskFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FilterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapNav)
