import React, { Component, Fragment } from "react";
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { getMarkers, updateActiveIndex, createConversation } from 'actions'
import { Accordion, Icon, Button } from 'semantic-ui-react'
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

  volunterClick(id ){
    const { headers} = this.props
    this.props.createConversation(id, headers)
  }

  render() {
    const { activeIndex, markers, user, headers, createConversation } = this.props
    return (
      <Accordion fluid styled style={{ height: '100%', overflow: 'hidden', overflowY: 'auto' }}>
        {markers.map(marker => (
          <div ref={marker.id} key={marker.id}>
            <Accordion.Title active={activeIndex === marker.id}  index={marker.id} onClick={this.handleClick}>
              {activeIndex!=marker.id&&(
                <Fragment>
                  <Icon name="dropdown" />
                  {marker.title}
                </Fragment>)}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === marker.id}>
              <TaskDetailsSimple marker={marker}>

                <Link to={`/task/${marker.id}`}>
                  <Button basic floated="right" color={
                    marker.task_type === 'material' ? 'blue' : 'green'
                    }>
                    View task
                  </Button>
                </Link>
                {marker.fulfilment_counter<4&&
                <Button basic floated="right" color="pink" onClick={this.volunterClick.bind(this, marker.id)}>
                  Volunteer
                </Button>
                }
              </TaskDetailsSimple>
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    )
  }
}
const mapStateToProps = state => ({
  markers: state.markers,
  activeIndex: state.variables.activeIndex,
  headers: state.headers,
  user: state.user,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMarkers, updateActiveIndex, createConversation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
