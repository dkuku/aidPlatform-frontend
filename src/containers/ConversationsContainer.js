import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMessages, sendMessage, doneTask, createConversation } from 'actions'

const url = process.env.REACT_APP_API

class ConversationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: Number(this.props.match.params.id),
      activeConv: null,
      body: '',
      task: {},
      conversations: [],
      messages: [],
    }
  }

  componentWillMount() {
    this.props.getConversations(this.state.activeIndex, this.props.headers)
  }
  componentDidMount() {
    this.props.activeIndex !== this.state.activeIndex ? this.props.updateActiveIndex(this.state.activeIndex) : null
  }

  handleSendMessage = () => {
    const id = this.props.activeIndex
    this.props.sendMessage(this.props.conversations[0].id, this.state.body, this.props.headers)
  }
  handleDoneClick = () => this.props.doneTask(this.props.conversations[0].id, this.props.headers)
  handleVolunteer = () => this.props.createConversation(this.props.activeIndex, this.props.headers)
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  renderContent() {
    const { task, conversations, messages, ltm } = this.props
    const { body } = this.state
    if (task === {}) {
      return <h1>Loading ...</h1>
    }
    return (
      <React.Fragment>
        {task && (
          <ConversationHeaderContainer
            done={task.done > 0}
            handleVolunteer={this.handleVolunteer}
            handleDoneClick={this.handleDoneClick}
            conversations={conversations}
            task={task}
          />
        )}

        {this.props.conversations[0] && (
          <React.Fragment>
            <MessagesContainer height={ltm ? '30vh' : '60vh'} messages={messages} conversation={conversations[0]} />
            <Form reply onSubmit={this.handleSendMessage}>
              <Form.Input placeholder="Message" name="body" value={body} onChange={this.handleChange} />
              <Form.Button floated="right" content="Submit" />
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
  task: state.currentTask,
  ltm: state.browser.lessThan.medium,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateActiveIndex, sendMessage, getConversations, getMessages, doneTask, createConversation },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversationsContainer))

ConversationsContainer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  task_id: PropTypes.string,
}
