import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'

export default class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      unfulfiled: this.props.markers.length,
    }
  }

  onReceived = stats => {
    console.log('Action Cable received data')
    this.setState({
      unfulfiled: stats.stats.unfulfiled,
    })
  }
  onConnected = data => {
    console.log('Action cable connected')
  }
  render() {
    return (
      <div>
        <ActionCable
          channel={{ channel: 'StatsChannel' }}
          onConnected={this.onConnected}
          onReceived={this.onReceived}
          onInitialized={this.onInitialized}
          onDisconnected={this.onDisconnected}
          onRejected={this.onRejected}
        />
        <h1>Tasks {this.state.unfulfiled}</h1>
      </div>
    )
  }
}
