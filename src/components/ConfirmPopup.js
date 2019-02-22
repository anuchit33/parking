import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Modal,Button } from 'semantic-ui-react'

class ConfirmPopup extends Component {

  render() {
    return (
      <Modal open={this.props.open} size='tiny'>
        <Modal.Header>Alert</Modal.Header>
        <Modal.Content>

          <Modal.Description>
            <div id="alert_message">{this.props.message}</div>
            
          </Modal.Description>

          
        </Modal.Content>
        <Modal.Actions>
            <Button positive id='btnAlertOK' onClick={this.props.onClose} >OK</Button>
          </Modal.Actions>
      </Modal>
    )
  }
}
ConfirmPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose : PropTypes.func.isRequired
}

export default ConfirmPopup;
