import React, { PureComponent } from 'react'
import { Form, Button, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
class FormModal extends PureComponent {
  render() {
    const { modalOpen, handleClose, modalClose, modalHeader, modalContent, modalButton } = this.props
    return (
      <Modal style={inlineStyle.modal} open={modalOpen} onClose={handleClose}>
        <Modal.Header> {modalHeader} </Modal.Header>
        <Modal.Content>{modalContent}</Modal.Content>
        <Modal.Actions>
          <Button color="teal" onClick={modalButton}>
            OK
          </Button>{' '}
        </Modal.Actions>
      </Modal>
    )
  }
}

export default FormModal
