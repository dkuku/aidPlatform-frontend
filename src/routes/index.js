import React from 'react'
import { connect } from 'react-redux'
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
    console.log(this.props)
    return (
      <Router>
        <React.Fragment>
          <MainModal />
          {!this.props.user.authentication_token ? (
            <Switch>
              <Route path="/login" component={LoginContainer} />
              <Route path="/" component={HomeContainer} />
            </Switch>
          ) : (
            <React.Fragment>
              <TopMenu />
              <Switch>
                <Route path="/settings" component={SettingsContainer} />
                <Route path="/task/:id" component={VolunteerContainer} />
                <Route path="/task" component={TaskForm} />
                <Route path="/" component={MapContainer} />}
              </Switch>
            </React.Fragment>
          )}
          <Footer />
        </React.Fragment>
      </Router>
    )
  }
}
const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, {})(Routes)
