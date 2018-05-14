import React from 'react'
import { MapContainer, LoginContainer, VolunteerContainer, SettingsContainer, HomeContainer } from 'containers'
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
        <React.Fragment>
          <TopMenu />
          <MainModal />
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/settings/:id" component={SettingsContainer} />
            <Route path="/settings" component={SettingsContainer} />
            <Route path="/task/:id" component={VolunteerContainer} />
            <Route path="/task" component={TaskForm} />
            <Route path="/home" component={HomeContainer} />
            <Route path="/" component={MapContainer} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    )
  }
}
export default Routes
