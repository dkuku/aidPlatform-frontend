import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, TextArea, Select, Grid, Header, Modal, Message, Segment } from 'semantic-ui-react'
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
function addTaskBody(title, description, lat, lng, task_type) {
  return {
    task: {
      title: title,
      description: description,
      lat: lat,
      lng: lng,
      task_type: task_type,
    },
  }
}

class TaskForm extends Component {
  state = {
    title: '',
    description: '',
    lat: 51.65,
    lng: 0.05,
    task_type: 'help',
    modalOpen: false,
    modalData: '',
    modalHeader: '',
    modalButton: () => {},
  }
  url = process.env.REACT_APP_API
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: value,
    })
  handleTaskSubmit = () => {
    const { title, description, lat, lng, task_type } = this.state
    const { latitude, longitude } = this.props.currentLocation
    const body = addTaskBody(title, description, latitude, longitude, task_type)
    const headers = { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } }
    this.props.addMarker(body, headers)
  }
  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
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

                <Form.Checkbox label="I agree to the Terms and Conditions" />

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
