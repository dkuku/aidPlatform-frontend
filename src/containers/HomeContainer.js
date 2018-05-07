import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container, Header, Button, Image, Segment, Grid } from 'semantic-ui-react'
import { SuccessStories } from 'components'
import { MobileContainer, DesktopContainer } from 'containers'

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <SuccessStories />
  </ResponsiveContainer>
)

export default HomepageLayout
