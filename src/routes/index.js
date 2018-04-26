import React from 'react'
import { MapContainer, LoginContainer, VolunteerContainer, SettingsContainer } from 'containers'
import { TopMenu, Footer, TaskForm, MainModal } from 'components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

class Routes extends React.Component {
  componentDidMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      // fade out
      ele.classList.add('available')
      // remove from DOM
      ele.outerHTML = ''
    }
  }
  render() {
    return (
      <Router>
        <Container>
          <TopMenu />
          <MainModal />
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/add" component={TaskForm} />
            <Route path="/settings" component={SettingsContainer} />
            <Route path="/task/:id" component={VolunteerContainer} />
            <Route path="/" component={MapContainer} />
          </Switch>
          <Footer />
        </Container>
      </Router>
    )
  }
}
export default Routes
