import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Button, Image, Segment, Grid } from 'semantic-ui-react'
import { Story } from 'components'

class SuccessStories extends Component {
  constructor() {
    super()
    this.state = {
      stories: [
        {
          title: 'Adam and the Johnsons Family',
          image: 'images/bbq.jpeg',
          body:
            'Adam meet the Johnsons when they needed to move their furniture. From that time they spend every weekend together',
        },
        {
          title: 'Photo Club',
          image: 'images/photo-friends.jpeg',
          body:
            'Ian, Mark, Eric and John meet when Eric had a broken leg and could not move out of the house for 2 months, now they are travelling and making photos together.',
        },
        {
          title: 'Neil and Regina',
          image: 'images/love.jpg',
          body: 'Reginas car had battery problems in a cold morning. Now they ane not afraid of cold any more',
        },
        {
          title: 'St. Patricks day',
          image: 'images/friends.jpeg',
          body: 'On Agricola Avenue after succesfull lawn mowing',
        },
      ],
    }
  }
  render() {
    const { mobile } = this.props

    return (
      <React.Fragment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid textAlign="center" celled="internally" columns="equal" stackable>
            <Grid.Row>
              {this.state.stories.slice(0, 2).map(story => (
                <Grid.Column key={story.title} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Story story={story} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment textAlign="center" style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Story story={this.state.stories[2]} />
          </Container>
        </Segment>
      </React.Fragment>
    )
  }
}

export default SuccessStories
