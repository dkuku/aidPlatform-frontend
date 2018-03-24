import React, { Component } from 'react'
import GoogleMapsWrapper from './GoogleMapsWrapper.js'
import { Marker } from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'

export default class MapSearch extends React.Component {
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
  componentDidMount() {
    const url = 'http://localhost:3000/api/v1/tasks'

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ markers: data.data.tasks })
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
          {this.state.markers.map(marker => (
            <Marker key={Number(marker.id)} position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} />
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
    )
  }
}
