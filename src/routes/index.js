import React from 'react'
import { CounterContainer } from 'containers'
import { MapContainer } from 'containers'
import { Header, Map } from 'components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router>
      <Container>
        <Header />
        <Route path="/" component={CounterContainer} />
        <Route path="/" component={MapContainer} />
      </Container>
    </Router>
  )
}

export default Routes
