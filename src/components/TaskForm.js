import React, { Component, Fragment } from 'react'
import { Button, Form, TextArea, Select, Grid, Header, Segment } from 'semantic-ui-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { withRouter } from 'react-router'
import Dropzone from 'react-dropzone'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addTask, updatePicture } from 'actions'
import formHOC from 'components/formHOC'

const options = [{ key: 'material', text: 'material', value: 'material' }, { key: 'help', text: 'help', value: 'help' }]

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: '',
      accepted: [],
      rejected: [],
      address: '',
      task: {
        title: '',
        description: '',
        lat: 0,
        lng: 0,
        task_type: 'help',
        address: '',
      },
    }
  }

  handleChange = (e, { name, value }) =>
    this.setState({
      task: {
        ...this.state.task,
        [name]: value,
      },
    })

  handleAddressChange = address => {
    this.setState({ task: { ...this.state.task, address: address } })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ task: { ...this.state.task, ...latLng, address: address } })
      })
      .catch(error => console.error('Error', error))
  }
  componentDidMount() {
    this.setState({ task: { ...this.state.task, ...this.props.location.state } })
  }
  handleTaskSubmit = () => {
    const { task } = this.state
    this.props.addTask({ task: task }, this.props.headers)
  }

  handleChangePicture = file => {
    this.setState({ picture: file.target.files[0] })
  }
  handlePictureSubmit = () => {
    this.props.updatePicture(this.state.accepted[0], this.props.headers)
  }
  onDropAccepted() {
    this.setState({ picture: this.state.accepted[0] })
  }
  render() {
    const { color } = this.props
    const { task, address, accepted, rejected } = this.state
    const form = !this.props.user.picture_file_name ? (
      <React.Fragment>
        <Form size="large" onSubmit={this.handlePictureSubmit}>
          <Segment stacked>
            <Header as="h2" color={color} textAlign="center">
              {' '}
              Add a picture of Your ID
            </Header>
            <Dropzone
              className="ui segment"
              accept="image/jpeg, image/png"
              onDrop={(accepted, rejected) => {
                this.setState({ accepted, rejected })
              }}
            >
              <p>Please add your ID</p>
              <p>Only *.jpeg and *.png images will be accepted</p>
            </Dropzone>
            <Header>Chosen file</Header>
            <ul>
              {this.state.accepted.map(f => (
                <li key={f.name}>
                  {f.name} - {f.size} bytes
                </li>
              ))}
            </ul>

            <Button color={color} fluid size="large">
              Upload
            </Button>
          </Segment>
        </Form>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Header as="h2" color={color} textAlign="center">
          {' '}
          Add a new request
        </Header>
        <Form size="large" onSubmit={this.handleTaskSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              label="Title"
              placeholder="Title. Max 50 letters."
              name="title"
              value={task.title}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Description"
              placeholder="Description max 300 letters"
              name="description"
              control={TextArea}
              value={task.description}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Select}
              name="task_type"
              label="Type"
              options={options}
              placeholder="Type"
              value={task.task_type}
              onChange={this.handleChange}
            />
            <div className="field">
              <label>Location</label>
              <PlacesAutocomplete value={task.address} onChange={this.handleAddressChange} onSelect={this.handleSelect}>
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
            <Button color={color} fluid size="large">
              Add task
            </Button>
          </Segment>
        </Form>
      </React.Fragment>
    )
    return <Fragment>{form}</Fragment>
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentLocation: state.position.geolocation,
    task: state.task,
    headers: state.headers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTask, updatePicture }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(formHOC(TaskForm)))
