import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { getMarkers, updateActiveIndex } from 'actions'
import { Accordion, Icon } from 'semantic-ui-react'
import { TaskDetailsSimple } from 'components'

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
    const { activeIndex, markers, user } = this.props
    return (
      <Accordion fluid styled style={{ minHeight: '30vh', overflow: 'hidden', overflowY: 'scroll' }}>
        {markers.map(marker => (
          <div ref={marker.id} key={marker.id}>
            <Accordion.Title active={activeIndex === marker.id} index={marker.id} onClick={this.handleClick}>
              <Icon name="dropdown" />
              {marker.title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === marker.id}>
              <TaskDetailsSimple marker={marker} />
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
  user: state.user,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMarkers, updateActiveIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
