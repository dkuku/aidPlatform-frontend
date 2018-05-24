import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { getMarkers, addMarker } from 'actions'
import { Grid, Container, Rail } from 'semantic-ui-react'
import { Map, TaskList, MapNav } from 'components'
import { GeoLocation } from 'react-redux-geolocation'

class MapContainer extends Component {
  static propTypes = {
    addMarker: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getMarkers()
  }

  render() {
    return (
        <Fragment>
        <GeoLocation />
      {this.props.ltm?(
        <Fragment>
        <Map />
        <TaskList />
        </Fragment>
        ):(
        <Grid container>
        <Grid.Row columns={2}>
        <Grid.Column computer={4} largeScreen={3}>
        <TaskList />
        </Grid.Column>
            <Grid.Column computer={12} largeScreen={13}>
            <Map />
        </Grid.Column>
        </Grid.Row>
        </Grid>
      )}
        </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  markers: state.markers,
    ltm: state.browser.lessThan.medium,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMarkers, addMarker }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
