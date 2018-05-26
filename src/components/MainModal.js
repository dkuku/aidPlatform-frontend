import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'
import * as ModalActions from 'actions/modal'

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
class MainModal extends PureComponent {
  buttonClick = () => {
    const { closeModal, history, modal } = this.props
    closeModal()
    if (!!modal.redirect) {
      if (modal.redirect instanceof Function) {
        modal.redirect()}
      else
        this.props.history.push(modal.redirect)
      }
    }

  render() {
    console.log(this.state, this.props)
    const { open, header, body, redirect, error } = this.props.modal

    return (
      <Modal
        style={inlineStyle.modal}
        open={open}
        onClose={() => {
          this.props.closeModal
        }}
      >
        {error ? <Modal.Header> {header} </Modal.Header> : <Modal.Header> {header} </Modal.Header>}
        <Modal.Content>{body}</Modal.Content>
        <Modal.Actions>
          <Button color="teal" onClick={this.buttonClick}>
            OK
          </Button>{' '}
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ModalActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainModal))
