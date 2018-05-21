import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Image, Menu, Segment, Responsive, Visibility } from 'semantic-ui-react'
import { LOGO } from '../constants/Icons'

import { HomeHeading } from 'components'

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={640}>
        <style>
          {`
      #backgroundImage {
    background-image:
      linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url('images/hands.jpeg') !important;
    background-size: cover !important
     `}
          }
        </style>

        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment id="backgroundImage" textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu
              secondary
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                {fixed ? (
                  <Menu.Item header>
                    <Image src={LOGO} size="mini" />
                    Neighborhood{' '}
                  </Menu.Item>
                ) : null}
                <Menu.Item position="right">
                  <Link to={'/login'}>
                    <Button inverted={!fixed}>Log in</Button>
                  </Link>
                  <Link to={'/login/signup'}>
                    <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomeHeading mobile={false} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer
