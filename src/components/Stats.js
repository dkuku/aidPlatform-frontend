import React, { Component, Fragment } from 'react'
import { Grid, Container, Segment, Statistic, Header } from 'semantic-ui-react'

const Stats = props => (
  <Fragment>
    <Segment
      inverted
      style={{
        height: '150px',
        bottom: '0px',
        left: '0px',
        width: '100%',
        position: 'fixed',
      }}
    >
      <Container textAlign="center">
        <Header inverted>Site statistics</Header>
        <Grid
          columns={3}
          style={{
            marginTop: 0,
          }}
        >
          <Grid.Row>
            <Grid.Column>
              <Statistic inverted size="small" label="Unfulfiled Tasks:" value={props.stats.unfulfiled} />
            </Grid.Column>
            <Grid.Column>
              <Statistic inverted size="small" label="Fulfiled Tasks:" value={props.stats.fulfiled} />
            </Grid.Column>
            <Grid.Column>
              <Statistic inverted size="small" label="Registered Users" value={props.stats.users} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </Fragment>
)
export default Stats
