import React, { Component } from 'react'
import { Button, Form, TextArea, Select, Grid, Header, Segment } from 'semantic-ui-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { GeoLocation } from 'react-redux-geolocation'
import GoogleMapsWrapper from './GoogleMapsWrapper.js'
import * as UserActions from 'actions/user'
import * as ApiActions from 'actions/apiActions'
import * as ModalActions from 'actions/modal'

const GMAP_KEY = process.env.REACT_APP_GMAP_KEY
const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
const options = [{ key: 'material', text: 'material', value: 'material' }, { key: 'help', text: 'help', value: 'help' }]

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } },
      address: '',
      task: {
        title: '',
        description: '',
        lat: 51.65,
        lng: 0.05,
        task_type: 'help',
      },
    }
  }
  url = process.env.REACT_APP_API
  handleChange = (e, { name, value }) =>
    this.setState({
      task: {
        ...this.state.task,
        [name]: value,
      },
    })

  handleAddressChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ task: { ...this.state.task, ...latLng } })
        console.log(this.state.task)
      })
      .catch(error => console.error('Error', error))
  }

  handleTaskSubmit = () => {
    const { task, headers } = this.state
    this.props.addTask(task, headers)
  }
  render() {
    const { task, address } = this.state
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {' '}
              Add new Request
            </Header>
            <Form size="large" onSubmit={this.handleTaskSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  label="Title"
                  placeholder="Title. Max 50 letters."
                  name="title"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Description"
                  placeholder="Description max 300 letters"
                  name="description"
                  control={TextArea}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Select}
                  name="task_type"
                  label="Type"
                  options={options}
                  placeholder="Type"
                  onChange={this.handleChange}
                />
                <div className="field">
                  <label>Location</label>
                  <PlacesAutocomplete value={address} onChange={this.handleAddressChange} onSelect={this.handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {suggestions.map(suggestion => {
                            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' }
                            return (
                              <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                <span>{suggestion.description}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
                <Button color="teal" fluid size="large">
                  Add task
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentLocation: state.position.geolocation,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions, ...ApiActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
