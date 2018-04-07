import React from 'react'
import { CounterContainer } from 'containers'
import { MapContainer } from 'containers'
import { LoginContainer } from 'containers'
import { TopMenu, Footer } from 'components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router>
      <Container>
        <TopMenu />
        <Route path="/login" component={LoginContainer} />
        <Route path="/" component={MapContainer} />
        <Route path="/" component={CounterContainer} />
        <Footer />
      </Container>
    </Router>
  )
}

export default Routes
