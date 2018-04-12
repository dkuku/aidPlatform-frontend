import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import GoogleMapsWrapper from './GoogleMapsWrapper.js'
import { Marker, InfoWindow } from 'react-google-maps'
import * as MarkersActions from 'actions/markers'
import * as Active from 'actions/activeIndex'
import { updateActiveIndex } from '../actions/activeIndex'
const help = 'http://localhost:3001/markers/green-pin.png'
const material = 'http://localhost:3001/markers/blue-pin.png'
const done = 'http://localhost:3001/markers/pink-pin.png'

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
        console.log(refs.map) // (not a Container, a Map) Map {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternalFiber: FiberNode, …}
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
    })
  }
  markerPin = (type, status, fulfiled) => {
    return (fulfiled === 5) | status ? done : type == 'material' ? material : help
  }
  render() {
    const { activeIndex, updateActiveIndex, currentLocation } = this.props
    console.log(currentLocation)
    const { latitude, longitude } = currentLocation

    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places" // libraries=geometry,drawing,places
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={9}
        defaultCenter={{ lat: latitude, lng: longitude }}
        onMapMounted={this.state.onMapMounted}
        onBoundsChanged={this.state.onBoundsChanged}
      >
        {this.props.markers.map(marker => (
          <Marker
            key={Number(marker.id)}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            onClick={() => updateActiveIndex(marker.id)}
            icon={this.markerPin(marker.task_type, marker.done, marker.fulfilment_counter)}
          >
            {marker.id === activeIndex && (
              <InfoWindow>
                <Card>
                  <Card.Content>
                    <Card.Header>{marker.title}</Card.Header>
                    <Card.Meta>
                      <span className="date">status: {marker.done ? 'done' : 'waiting'}</span>
                    </Card.Meta>
                    <Card.Description>{marker.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user" />
                      {marker.fulfilment_counter} users replied
                    </a>
                  </Card.Content>
                </Card>
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
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...MarkersActions, ...Active }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSearch)
