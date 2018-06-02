import React, { Component } from 'react'
import { Form, Button, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'

const color = 'teal'
const formHOC = WrappedComponent =>
  class FORMHOC extends Component {
    render() {
      return (
        <div className="form">
          <style>{`
      body,
      body > div,
      body > div > div{
     }
      body > div > div > div.form {
      margin-top: 80px
     }
      body> div > div >div.form > div {
      }
    `}</style>
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <WrappedComponent {...this.props} color={color} />
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }

export default formHOC
