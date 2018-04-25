import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as MarkersActions from 'actions/markers'
import * as ApiActions from 'actions/apiActions'
import { Grid } from 'semantic-ui-react'
import { Map, TaskList, MapNav } from 'components'
import { GeoLocation } from 'react-redux-geolocation'

class MapContainer extends React.Component {
  static propTypes = {
    addMarker: PropTypes.func.isRequired,
  }

  url = process.env.REACT_APP_API
  componentDidMount() {
    this.props.getMarkers()
  }
  render() {
    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <TaskList />
          </Grid.Column>
          <Grid.Column width={12}>
            <GeoLocation />
            <MapNav />
            <Map />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  markers: state.markers,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...MarkersActions, ...ApiActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
