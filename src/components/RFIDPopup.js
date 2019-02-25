import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Modal, Button ,Input} from 'semantic-ui-react'

class RFIDPopup extends Component {

    constructor(props){
        super(props)

        this.state = {}
    }

    render() {
        return (
            
                <Modal open={this.props.open} size='tiny' >
                    <Modal.Header>Alert</Modal.Header>
                    <Modal.Content>

                        <Modal.Description>
                        <div id="rfidPopup">
                            <Input placeholder='RFID' name='rfid' id='inputRFID' value={this.state.rfid}  onChange={(e,v)=>this.handleInput(e,v)} />
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive id='btnAlertOK' onClick={this.props.onClose} >Cancel</Button>
                    </Modal.Actions>
                </Modal>
        )
    }
}
RFIDPopup.propTypes = {
    open: PropTypes.bool.isRequired,
    car_items: PropTypes.array.isRequired
}

export default RFIDPopup;
