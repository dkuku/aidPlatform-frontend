import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form, Comment, Header, Button } from 'semantic-ui-react'
import { Message, VolunteerConvHeader, TaskOwnerConvHeader } from 'components'
import { MessagesContainer } from 'containers'
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
      conversationMessages: this.props.messages.filter(message => message.task_id == this.props.activeIndex),
      taskConversation: this.props.conversations.filter(conv => conv.task_id == this.props.activeIndex)
        ? this.props.conversations.filter(conv => conv.task_id == this.props.activeIndex)
        : [],
      owner: this.props.markers.filter(task => task.id == this.props.activeIndex)[0].user_id === this.props.user.id,
    }
  }

  componentWillReceiveProps() {
    console.log(this.props)
    this.setState({
      taskConversation: this.props.conversations.filter(conv => conv.task_id == this.props.activeIndex),
      conversationMessages: this.props.messages.filter(message => message.task_id == this.props.activeIndex),
    })
    console.log(this.state)
  }

  componentDidMount() {
    !(this.props.activeIndex === this.state.activeIndex) ? this.props.updateActiveIndex(this.state.activeIndex) : null
    this.props.getConversations(this.state.activeIndex, this.props.headers)
    this.props.getMessages(this.props.headers)
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

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
    const { owner, body, conversationMessages, taskConversation } = this.state
    if (!this.state.taskConversation) {
      return <h1>Loading ...</h1>
    }
    return (
      <React.Fragment>
        {owner ? (
          <TaskOwnerConvHeader
            handleItemClick={this.handleItemClick}
            activeConv={this.state.activeConv}
            conversations={taskConversation}
          />
        ) : (
          <VolunteerConvHeader handleDoneClick={this.handleDoneClick} name={taskConversation.task_owner_name} />
        )}

        <MessagesContainer
          messages={conversationMessages}
          taskOwnerName={taskConversation.task_owner_name}
          volunteerName={taskConversation.volunteer_name}
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
