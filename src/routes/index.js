import React from 'react'
import { CounterContainer } from 'containers'
import { MapContainer } from 'containers'
import { LoginContainer } from 'containers'
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
          <Route path="/" component={MapContainer} />
        </Switch>
        <Footer />
      </Container>
    </Router>
  )
}

export default Routes
