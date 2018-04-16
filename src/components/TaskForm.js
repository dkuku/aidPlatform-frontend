import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, TextArea, Select, Grid, Header, Modal, Message, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { GeoLocation } from 'react-redux-geolocation'
import { FormModal } from 'components'
import * as UserActions from 'actions/user'
const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
const options = [{ key: 'material', text: 'material', value: 'material' }, { key: 'help', text: 'help', value: 'help' }]
function addTaskBody(user_id, title, description, lat, lng, task_type) {
  return {
    task: {
      user_id: user_id,
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
    const { title, description, lat, lng, task_type, modalButton, modalHeader, modalOpen, modalData } = this.state
    const { latitude, longitude } = this.props.currentLocation
    axios
      .post(`${this.url}tasks`, addTaskBody(this.props.user.id, title, description, latitude, longitude, task_type), {
        headers: { 'AUTH-TOKEN': this.props.user.authentication_token },
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({ modalHeader: `Task created` })
        }
        this.setState({
          modalData: `Your request ${title}. 
          With the description: ${description}
          Was added to the website`,
        })
        console.log(response)
        this.setState({
          modalButton: () => {
            this.props.history.push('/')
          },
        })
        this.setState({ modalOpen: true })
      })
      .catch(error => {
        this.setState({ modalHeader: `Error` })
        this.setState({
          modalData:
            error.response.data.messages || 'There was an error submitting the form, please try again in 5 minutes',
        })
        this.setState({
          modalButton: () => this.setState({ modalOpen: false }),
        })
        this.setState({ modalOpen: true })
        console.log(error.response.data)
      })
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
        <FormModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleClose}
          modalHeader={this.state.modalHeader}
          modalContent={this.state.modalData}
          modalButton={this.state.modalButton}
        />
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
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
