import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as MarkersActions from 'actions/markers'
import { Accordion, Icon } from 'semantic-ui-react'

class TaskList extends Component {
  state = {
    activeIndex: 0,
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    //const {markers} = this.props
    const { activeIndex } = this.state
    return (
      <Accordion fluid styled>
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
const mapStateToProps = state => {
  return {
    markers: state.markers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MarkersActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
