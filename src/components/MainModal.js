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
    this.props.closeModal()
    this.props.history.push('/')
  }

  render() {
    const { open, header, body, redirect } = this.props.modal

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
