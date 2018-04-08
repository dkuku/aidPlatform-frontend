import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import * as MarkersActions from 'actions/markers'
import { Grid } from 'semantic-ui-react'
import { Map, TaskList, MapNav } from 'components'

class MapContainer extends React.Component {
  static propTypes = {
    addMarker: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const url = '/api/tasks'

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.props.updateMarkers({ markers: data.data.tasks })
      })
  }
  render() {
    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <TaskList />
          </Grid.Column>
          <Grid.Column width={12}>
            <MapNav />
            <Map />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
