import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Modal, Button ,Input} from 'semantic-ui-react'
import Api from '../Api'

class RFIDPopup extends Component {

    constructor(props){
        super(props)

        this.state = {}
    }

    handleInput(e,v){
        this.setState({
            [v.name]: v.value
        })
    }

    async handleSubmitRFID(e){

        if (e.keyCode == 13) {
            const data = await Api.get('/carlist/?rfid='+this.state.rfid)

            if(data.data.length==1){
                this.setState({
                    rfid: '',                    
                })

                this.props.onData(data.data[0])
            }
        }
    }

    render() {
        return (
            
                <Modal open={this.props.open} size='tiny' >
                    <Modal.Header>Scan RFID</Modal.Header>
                    <Modal.Content>

                        <Modal.Description>
                        <div id="rfidPopup">
                            <Input onKeyUp={(e)=>this.handleSubmitRFID(e)} placeholder='RFID' name='rfid' id='inputRFID' value={this.state.rfid}  onChange={(e,v)=>this.handleInput(e,v)} />
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
    onData: PropTypes.func.isRequired,
    car_items: PropTypes.array.isRequired
}

export default RFIDPopup;
