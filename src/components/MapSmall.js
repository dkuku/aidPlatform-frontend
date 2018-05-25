import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Marker, InfoWindow } from 'react-google-maps'
import { MarkerDisplay } from 'components'
import { updateActiveIndex, updateBounds, updateCenter, getMarkersBounds } from 'actions'
import GoogleMapsWrapper from './GoogleMapsWrapper.js'
import { BLUE, GREEN, PINK } from '../constants/Icons'
import { GMAP_KEY } from '../constants/variables'

const help = GREEN
const material = BLUE
const done = PINK

class MapSmall extends Component {
  componentWillMount() {
    let refs = {}

    this.setState({
      onMapMounted: map => {
        refs.map = map
      },
    })
  }

  //TODO: temporary
  markerPin = (type, status, fulfiled) => {
    return (fulfiled === 5) | status ? done : type == 'material' ? material : help
  }
  render() {
    const { marker } = this.props
    const { lat, lng } = marker

    return (
      <GoogleMapsWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&libraries=geometry,drawing,places`} // libraries=geometry,drawing,places
        loadingElement={<div style={{}} />}
        containerElement={<div style={{ height: `25vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={9}
        defaultCenter={{ lat, lng }}
      >
        <Marker
          position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
          onClick={() => updateActiveIndex(marker.id)}
          icon={this.markerPin(marker.task_type, marker.done, marker.fulfilment_counter)}
        >
          <InfoWindow>
            <p>{marker.title}</p>
          </InfoWindow>
        </Marker>
      </GoogleMapsWrapper>
    )
  }
}

export default MapSmall