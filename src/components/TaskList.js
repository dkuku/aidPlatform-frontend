import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as MarkersActions from 'actions/markers'
import * as FilterActions from '../actions/filters'
import * as Active from 'actions/activeIndex'
import { Accordion, Icon } from 'semantic-ui-react'
import { MarkerDisplay } from 'components'

class TaskList extends Component {
  state = {
    activeIndex: 0,
  }
  componentDidUpdate() {
    !!this.refs[this.props.activeIndex]
      ? this.refs[this.props.activeIndex].scrollIntoView({ block: 'start', behavior: 'smooth' })
      : null
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
    const { activeIndex, markers } = this.props
    const filters = this.props.filters || { type: 'all' }
    const created_at = this.props.filters || { startDate: new Date() }
    return (
      <Accordion styled style={{ height: '700px', overflow: 'hidden', overflowY: 'scroll' }}>
        {markers
          .filter(marker => ('all' == filters.type ? true : marker.task_type == filters.type))
          .filter(marker => new Date(marker.created_at) > new Date(filters.startDate))
          .map(marker => (
            <div ref={marker.id} key={marker.id}>
              <Accordion.Title active={activeIndex === marker.id} index={marker.id} onClick={this.handleClick}>
                <Icon name="dropdown" />
                {marker.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === marker.id}>
                <MarkerDisplay marker={marker} />
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
  filters: state.filters,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...FilterActions, ...MarkersActions, ...Active }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
