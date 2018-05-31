import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { getMarkers, addMarker } from 'actions'
import { Grid, Container, Rail } from 'semantic-ui-react'
import { Map, TaskList, MapNav } from 'components'

class MapContainer extends Component {
  static propTypes = {
    addMarker: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getMarkers()
  }

  render() {
    return (
      <div>
        {this.props.smallScreen ? (
          <Fragment>
            <div style={{ position: 'fixed', left: '0px', top: '80px', width: '100%', bottom: '60%' }}>
              <Map />
            </div>
            <div style={{ position: 'fixed', left: '0px', top: '40%', width: '100%', bottom: '150px' }}>
              <TaskList />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div style={{ position: 'fixed', left: '300px', top: '80px', width: '100%', bottom: '150px' }}>
              <Map />
            </div>
            <div style={{ position: 'fixed', left: '0px', top: '80px', width: '300px', bottom: '150px' }}>
              <TaskList />
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  markers: state.markers,
  smallScreen: state.browser.lessThan.medium,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMarkers, addMarker }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
