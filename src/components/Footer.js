import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCableProvider, ActionCable } from 'react-actioncable-provider'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as StatsActions from 'actions/stats.actions'
import { Stats } from 'components'

class Footer extends Component {
  componentDidMount() {
    this.props.getStats()
  }

  onReceived = stats => {
    this.props.updateStats(stats)
  }

  onConnected = data => {
    console.log('Action cable connected')
  }

  render() {
    {
      console.log('Footer: ', this.props)
    }
    return (
      <ActionCableProvider url={'ws://localhost:3000/stats'}>
        <ActionCable
          channel={{ channel: 'StatsChannel' }}
          onConnected={this.onConnected}
          onReceived={this.onReceived}
          onDisconnected={this.onDisconnected}
          onRejected={this.onRejected}
        />
        <Stats stats={this.props.stats} />
      </ActionCableProvider>
    )
  }
}
const mapStateToProps = state => {
  return {
    stats: state.stats,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(StatsActions, dispatch)
}
Footer.propTypes = {
  stats: PropTypes.object.isRequired,
  getStats: PropTypes.func.isRequired,
  updateStats: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)
