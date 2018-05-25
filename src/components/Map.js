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

class MapSearch extends Component {
  state = {
    activeIndex: 0,
  }
  componentWillMount() {
    let refs = {}

    this.setState({
      onMapMounted: map => {
        refs.map = map
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
        this.props.updateBounds(this.state.bounds)
        this.props.updateCenter(this.state.center)
        this.props.getMarkersBounds(this.state.bounds)
      },
    })
  }

  //TODO: temporary
  markerPin = (type, status, fulfiled) => {
    return (fulfiled === 5) | status ? done : type == 'material' ? material : help
  }
  render() {
    const { markers, activeIndex, updateActiveIndex, currentLocation, user } = this.props
    const filters = this.props.filters || { type: 'all' }
    const created_at = this.props.filters || { startDate: new Date() }
    const { latitude, longitude } = currentLocation
    return (
      <GoogleMapsWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&libraries=geometry,drawing,places`} // libraries=geometry,drawing,places
        loadingElement={<div style={{}} />}
        containerElement={<div style={{ height: `100%`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%`, width: '100%' }} />}
        defaultZoom={9}
        defaultCenter={{ lat: latitude, lng: longitude }}
        onMapMounted={this.state.onMapMounted}
        onBoundsChanged={this.state.onBoundsChanged}
      >
        {markers.map(marker => (
          <Marker
            key={Number(marker.id)}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            onClick={() => updateActiveIndex(marker.id)}
            icon={this.markerPin(marker.task_type, marker.done, marker.fulfilment_counter)}
          >
            {marker.id === activeIndex && (
              <InfoWindow>
                <p>{marker.title}</p>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMapsWrapper>
    )
  }
}
const mapStateToProps = state => ({
  markers: state.markers,
  activeIndex: state.activeIndex,
  currentLocation: state.position.geolocation,
  filters: state.filters,
  user: state.user,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateBounds, updateCenter, updateActiveIndex, getMarkersBounds }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSearch)
