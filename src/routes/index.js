import React from 'react'
import { CounterContainer } from 'containers'
import { MapContainer, LoginContainer, VolunteerContainer } from 'containers'
import { TopMenu, Footer, TaskForm } from 'components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router>
      <Container>
        <TopMenu />
        <Switch>
          <Route path="/login" component={LoginContainer} />
          <Route path="/add" component={TaskForm} />
          <Route path="/task/:id" component={VolunteerContainer} />
          <Route path="/" component={MapContainer} />
        </Switch>
        <Footer />
      </Container>
    </Router>
  )
}

export default Routes
