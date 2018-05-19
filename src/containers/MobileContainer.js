import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Icon, Menu, Responsive, Segment, Sidebar } from 'semantic-ui-react'
import { HomeHeading } from 'components'

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class MobileContainer extends Component {
  state = {}

  render() {
    const { children } = this.props

    return (
      <Responsive maxWidth={639}>
        <Segment inverted textAlign="center" style={{ minHeight: 350, padding: '1em 0em' }} vertical>
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item position="right">
                <Link to={'/login'}>
                  <Button as="a" inverted>
                    Log in
                  </Button>
                </Link>
                <Link to={'/login/signup'}>
                  <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Link>
              </Menu.Item>
            </Menu>
          </Container>
          <HomeHeading mobile />
        </Segment>

        {children}
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

export default MobileContainer
