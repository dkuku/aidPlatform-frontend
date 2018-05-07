import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Button, Icon } from 'semantic-ui-react'

const HomeHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Neighborhelp"
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as="h2"
      content="Not all heros wear capes"
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
)
HomeHeading.propTypes = {
  mobile: PropTypes.bool,
}
export default HomeHeading
