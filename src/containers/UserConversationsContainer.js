import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMessages, sendMessage } from 'actions'

const url = process.env.REACT_APP_API

class ConversationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: Number(this.props.id),
      activeConv: null,
      body: '',
      task: {},
      conversations: [],
      messages: [],
    }
  }

  componentWillMount() {
    /*this.props.getConversations(this.state.activeIndex, this.props.headers)*/
  }
  componentDidMount() {
    this.props.activeIndex !== this.state.activeIndex ? this.props.updateActiveIndex(this.state.activeIndex) : null
    axios.get(`${url}tasks/${this.props.id}`, this.props.headers).then(response => {
      console.log(response)
      this.setState({
        conversations: response.data.data.conversations,
        messages: response.data.data.messages,
        task: response.data.data.task,
      })
    })
  }

  handleSendMessage = () => {
    const id = this.props.activeIndex
    this.props.sendMessage(this.state.conversations[0].id, this.state.body, this.props.headers)
  }

  handleDoneClick = () => console.log('done clicked')
  handleVolunteer = () => console.log('Volunteer clicked')
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  renderContent() {
    const { task, conversations, messages, body } = this.state
    if (task === {}) {
      return <h1>Loading ...</h1>
    }
    return (
      <React.Fragment>
        {JSON.stringify(this.props.id)}
        <ConversationHeaderContainer
          handleVolunteer={this.handleVolunteer}
          handleDoneClick={this.handleDoneClick}
          conversations={conversations}
        />

        {this.state.conversations[0] && (
          <React.Fragment>
            <MessagesContainer
              messages={messages}
              taskOwnerName={conversations[0].task_owner_name}
              volunteerName={conversations[0].volunteer_name}
            />
            <Form reply onSubmit={this.handleSendMessage}>
              <Form.Group>
                <Form.Input placeholder="Message" name="body" value={body} onChange={this.handleChange} />
                <Form.Button content="Submit" />
              </Form.Group>
            </Form>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>
  }
}
const mapStateToProps = state => ({
  messages: state.messages,
  user: state.user,
  activeIndex: state.activeIndex,
  conversations: state.conversations,
  headers: state.headers,
  markers: state.markers,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, sendMessage, getConversations, getMessages }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversationsContainer))

ConversationsContainer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  task_id: PropTypes.string,
}
