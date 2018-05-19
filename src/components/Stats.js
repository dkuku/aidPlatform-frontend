import React, { Component } from 'react'
import { Grid, Container, Segment, Statistic, Header } from 'semantic-ui-react'

const Stats = props => (
  <Segment inverted>
    <Container
      textAlign="center"
      style={{
        marginBottom: '5em',
        marginTop: '3em',
      }}
    >
      <Header inverted>Site statistics</Header>
      <Grid
        columns={3}
        divided
        stackable
        style={{
          marginBottom: '5em',
          marginTop: 0,
        }}
      >
        <Grid.Row>
          <Grid.Column>
            <Statistic inverted label="Unfulfiled Tasks:" value={props.stats.unfulfiled} />
          </Grid.Column>
          <Grid.Column>
            <Statistic inverted label="Fulfiled Tasks:" value={props.stats.fulfiled} />
          </Grid.Column>
          <Grid.Column>
            <Statistic inverted label="Registered Users" value={props.stats.users} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      Created with lots of sweat, tears and backspaces. 2018 Daniel Kukula
    </Container>
  </Segment>
)
export default Stats
