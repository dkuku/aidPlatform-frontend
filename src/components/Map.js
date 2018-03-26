import React, { Component } from 'react'
import GoogleMapsWrapper from './GoogleMapsWrapper.js'
import { Marker } from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as MarkersActions from 'actions/markers'

class MapSearch extends Component {
  componentWillMount() {
    let refs = {}

    this.setState({
      markers: [{ lat: 51.5, lng: -0.2 }],
      onMapMounted: map => {
        refs.map = map
      },
      onBoundsChanged: () => {
        console.log(refs.map) // (not a Container, a Map) Map {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternalFiber: FiberNode, …}
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
    })
  }

  render() {
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places" // libraries=geometry,drawing,places
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={9}
        defaultCenter={{ lat: 51.5, lng: -0.2 }}
        onMapMounted={this.state.onMapMounted}
        onBoundsChanged={this.state.onBoundsChanged}
      >
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={20}>
          {this.props.markers.map(marker => (
            <Marker key={Number(marker.id)} position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} />
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapSearch)
