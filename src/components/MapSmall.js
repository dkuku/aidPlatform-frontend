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
  constructor(props){
    super(props)
    this.state={lat: Number(this.props.marker.lat) || 51.2,
                lng: Number(this.props.marker.lng) || 0,
    }
  }
  componentWillMount() {
    let refs = {}

    this.setState({
      onMapMounted: map => {
        refs.map = map
      },
    })
  }
  componentDidMount() {
  }
  componentDidUpdate() {
    if (Number(this.state.lat) !== Number(this.props.marker.lat)) {
      this.setState({lat: Number(this.props.marker.lat),
      lng: Number(this.props.marker.lng) })}
  }

  //TODO: temporary
  markerPin = (type) => {
    return window.location.origin + `${type == 'material' ? material : help}`
  }
  render() {
    const { marker, height='150px' } = this.props
    const { lat = Number(lat), lng=Number(lng) } = this.state

    return (
      <GoogleMapsWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&libraries=geometry,drawing,places`} // libraries=geometry,drawing,places
        loadingElement={<div style={{}} />}
        containerElement={<div style={{ height: `${height}` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={11}
        defaultCenter={{ lat, lng }}
      >
        <Marker
          position={{ lat, lng }}
          onClick={() => updateActiveIndex(marker.id)}
          icon={this.markerPin(marker.task_type)}
        />
      </GoogleMapsWrapper>
    )
  }
}

export default MapSmall
