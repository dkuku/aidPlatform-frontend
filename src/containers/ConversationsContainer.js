import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import { ConversationHeaderContainer, MessagesContainer } from 'containers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMessages, sendMessage } from 'actions'

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
    this.props.sendMessage(id, this.state.body, this.props.headers)
  }

  handleDoneClick = () => console.log('done clicked')

  handleItemClick = (e, { name }) => {
    this.setState({ activeConv: name })
    console.log(name)
  }

  renderContent() {
    console.log(this.state)
    const { owner, body, conversationMessages, taskConversation } = this.state
    if ((this.props.conversations.length = 0)) {
      return <h1>Loading ...</h1>
    }
    return (
      <React.Fragment>
        <ConversationHeaderContainer handleDoneClick={this.handleDoneClick} conversations={this.props.conversations} />

        <MessagesContainer
          messages={this.props.messages}
          taskOwnerName={this.props.conversations.task_owner_name}
          volunteerName={this.props.conversations.volunteer_name}
        />
        <Form reply onSubmit={this.handleSendMessage}>
          <Form.Group>
            <Form.Input placeholder="Message" name="body" value={body} onChange={this.handleChange} />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
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
