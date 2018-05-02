import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Button, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
import * as ModalActions from 'actions/ModalActions'

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
class MainModal extends Component {
  render() {
    const { open, header, body, redirect } = this.props.modal
    function buttonClick() {
      this.props.history.push(redirect)
    }

    return (
      <Modal
        style={inlineStyle.modal}
        open={open}
        onClose={() => {
          this.props.closeModal
        }}
      >
        <Modal.Header> {header} </Modal.Header>
        <Modal.Content>{body}</Modal.Content>
        <Modal.Actions>
          <Button color="teal" onClick={this.props.closeModal}>
            OK
          </Button>{' '}
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ModalActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainModal)
