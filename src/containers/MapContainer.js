import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { getMarkers, addMarker } from 'actions'
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
      <Grid relaxed stackable reversed="computer">
        <Grid.Row columns={2}>
          <Grid.Column computer={11} largeScreen={13} widescreen={14}>
            <GeoLocation />
            <Map />
          </Grid.Column>
          <Grid.Column computer={5} largeScreen={3} widescreen={2}>
            <TaskList />
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
  return bindActionCreators({ getMarkers, addMarker }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
