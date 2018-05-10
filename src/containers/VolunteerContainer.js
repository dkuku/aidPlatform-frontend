import React, { Component } from 'react'
import { Grid, Menu, Header, Button, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateActiveIndex, getConversations, getMarkers } from 'actions'
import { TaskDetails } from 'components'
import { MessagesContainer } from 'containers'

class VolunteerContainer extends Component {
  constructor(props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.volunteerRequest = this.volunteerRequest.bind(this)
    this.state = {
      headers: { headers: { 'AUTH-TOKEN': this.props.user.authentication_token } },
      activeConv: null,
      activeIndex: this.props.match.params.id,
    }
  }

  componentWillMount() {
    if (this.props.markers.length === 1) {
      this.props.getMarkers()
    }
  }
  componentDidMount() {
    console.log(this.props)
    console.log(this.state)
    const { headers, getConversations } = this.state
    this.props.getConversations(this.state.activeIndex, headers)
    this.setState({
      marker: this.props.markers.filter(obj => {
        obj.id == this.activeIndex
      })[0],
    })
  }
  componentDidUpdate() {}
  handleItemClick(e, { name }) {
    e.preventDefault()
    this.setState({ activeConv: name })
  }
  volunteerRequest = () => this.props.createConversation(this.state.activeIndex, this.state.headers)

  render() {
    console.log(this.props.conversations)
    const { activeConv, activeIndex } = this.state
    const { conversations, createConversation } = this.props.conversations
    const marker = this.props.markers.filter(obj => obj.id == activeIndex)[0]
    console.log(marker)
    var name
    console.log(this.props)
    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            {!(this.props.markers.length === 1) && (
              <TaskDetails marker={this.props.markers.filter(obj => obj.id == activeIndex)[0]} />
            )}
          </Grid.Column>
          <Grid.Column>
            <Segment>
              {this.props.conversations && this.props.conversations.length > 0 ? (
                <Menu attached="top" tabular>
                  {this.props.conversations.map(conversation => (
                    <Menu.Item
                      key={conversation.id}
                      name={conversation.volunteer_name}
                      active={this.state.activeConv === conversation.volunteer_name}
                      onClick={this.handleItemClick}
                    />
                  ))}
                </Menu>
              ) : (
                <Header>
                  No conversation for this task.
                  {!!marker && (
                    <Button
                      positive
                      onClick={this.volunteerRequest}
                      disabled={marker.done || marker.fulfiled_counter > 4}
                      floated="right"
                    >
                      Volunteer
                    </Button>
                  )}
                </Header>
              )}
              {this.props.conversations.map(
                conversation =>
                  conversation.volunteer_name === this.state.activeConv && (
                    <MessagesContainer key={conversation.id} headers={this.state.headers} conversation={conversation} />
                  )
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    conversations: state.conversations,
    activeIndex: state.activeIndex,
    markers: state.markers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateActiveIndex, getMarkers, getConversations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerContainer)
