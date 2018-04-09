import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as MarkersActions from 'actions/markers'
import * as Active from 'actions/activeIndex'
import { Accordion, Icon } from 'semantic-ui-react'

class TaskList extends Component {
  state = {
    activeIndex: 0,
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.props.updateActiveIndex(newIndex)
    this.setState({ activeIndex: newIndex })
  }

  render() {
    //const {markers} = this.props
    const { activeIndex } = this.props
    return (
      <Accordion styled style={{ height: '700px', overflow: 'hidden', 'overflow-y': 'scroll' }}>
        {this.props.markers.map(marker => (
          <div key={marker.id}>
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
const mapStateToProps = state => ({
  markers: state.markers,
  activeIndex: state.activeIndex,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...MarkersActions, ...Active }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
