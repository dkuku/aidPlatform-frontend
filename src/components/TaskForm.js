import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, TextArea, Select, Grid, Header, Modal, Message, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import * as UserActions from 'actions/user'
const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
const options = [{ key: 'm', text: 'Male', value: 'male' }, { key: 'f', text: 'Female', value: 'female' }]
function addTaskBody(user_id, title, description, lat, lng) {
  return {
    task: {
      user_id: user_id,
      title: title,
      description: description,
      lat: lat,
      lng: lng,
    },
  }
}

class TaskForm extends Component {
  state = {
    title: '',
    description: '',
    lat: 51.65,
    lng: 0.05,
    modalOpen: false,
    modalData: '',
    modalHeader: '',
    modalButton: () => {},
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: value,
    })
  handleTaskSubmit = () => {
    const { title, description, lat, lng, modalButton, modalHeader, modalOpen, modalData } = this.state
    console.log(this.props)
    axios
      .post('/api/tasks', addTaskBody(this.props.user.id, title, description, lat, lng), {
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
          modalData: error.response.data[0] || 'There was an error submitting the form, please try again in 5 minutes',
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
                <Form.Input fluid label="Title" placeholder="Title" name="title" onChange={this.handleChange} />
                <Form.Input
                  label="Description"
                  placeholder="Description"
                  name="description"
                  control={TextArea}
                  onChange={this.handleChange}
                />
                <Form.Field control={Select} label="Gender" options={options} placeholder="Gender" />

                <Form.Checkbox label="I agree to the Terms and Conditions" />

                <Button color="teal" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <Modal style={inlineStyle.modal} open={this.state.modalOpen} onClose={this.handleClose}>
          <Modal.Header> {this.state.modalHeader} </Modal.Header>
          <Modal.Content>{this.state.modalData}</Modal.Content>
          <Modal.Actions>
            <Button color="teal" onClick={this.state.modalButton}>
              OK
            </Button>{' '}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
