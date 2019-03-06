import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Modal, Button ,Table,Grid,Form} from 'semantic-ui-react'
import Api from '../Api'

class CheckoutPopup extends Component {

    constructor(props){
        super(props)

        this.state = {
            error: {}
        }
    }

    handleCheckOut(){

        
    }


    render() {
        return (
            
                <Modal open={this.props.open}  >
                    <Modal.Header>Check out</Modal.Header>
                    <Modal.Content>

                        <Modal.Description>
                        <div id="popupCheckout">
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <p>Befor</p>
                                <img style={{ width: '300px' }} id="imageCheckin" src='https://f.ptcdn.info/870/053/000/owyxsmiy82CtwVCpV1x-o.jpg' />
                                </Grid.Column>
                                <Grid.Column>
                                <p>After</p>
                                <img style={{ width: '300px' }} id="imageCheckin" src='https://f.ptcdn.info/870/053/000/owyxsmiy82CtwVCpV1x-o.jpg' />
                                </Grid.Column>
                                <Grid.Column>

                                <Table celled>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>RFID</Table.Cell>
                                            <Table.Cell>{this.props.data.rfid}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>ทะเบียนรถ</Table.Cell>
                                            <Table.Cell>{this.props.data.number}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>วันที่เช็กอิน</Table.Cell>
                                            <Table.Cell>{this.props.data.check_in_date}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>ระยะเวลา</Table.Cell>
                                            <Table.Cell>{this.props.data.check_in_date}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>ยอดชำระ</Table.Cell>
                                            <Table.Cell>{this.props.data.check_in_date}</Table.Cell>
                                        </Table.Row>
                                        </Table.Body>

                                    </Table>
                                
                                </Grid.Column>
                            </Grid.Row>
                            </Grid>
                        </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button positive id='btnCheckout' onClick={this.handleCheckOut()} >Check out</Button>
                        <Button   onClick={this.props.onClose} >Cancel</Button>
                    </Modal.Actions>
                </Modal>
        )
    }
}
CheckoutPopup.propTypes = {
    open: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
}

export default CheckoutPopup;
