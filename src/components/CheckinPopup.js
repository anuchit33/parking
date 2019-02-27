import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Modal, Button, Input, Grid, Form } from 'semantic-ui-react'
import ConfirmPopup from './ConfirmPopup';


class CheckInPoup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popup_confirm_message: '',
      popup_confirm_display: false
    }

  }

  checkValid(){

    if(this.state.rfid==null || this.state.rfid==''){
      alert('RFID ต้องไม่เป็นค่าว่าง')
      return false;
    }

    if(this.state.car_number==null || this.state.car_number==''){
      alert('หมายเลข ต้องไม่เป็นค่าว่าง')
      return false;
    }
    return true
  }

  handleCancelCheckin(){
    this.reset()
    this.props.onClose()
  }
  handleSubmitCheckin(){


    if(this.checkValid()==true){
      this.setState({
        popup_confirm_message: 'สำเร็จ',
        popup_confirm_display: true
      } )

      this.props.onSubmitSuccess({
        car_number: this.state.car_number,
        rfid: this.state.rfid
      })      
    }

    this.reset()
  }

  reset(){
    this.setState({
      car_number: '',
      rfid: ''
    })
  }

  handleCloseAlert(){
    this.props.onClose()
    this.setState({popup_confirm_display: false})
  }

  handleInput(e,v){
    this.setState({[v.name]: v.value})
  }

  render() {

    return (
      <Modal open={this.props.open} id='checkinPopup'>
        <Modal.Header>Check In</Modal.Header>
        <Modal.Content image>

          <Modal.Description>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <img style={{ width: '300px' }} id="imageCheckin" src='https://f.ptcdn.info/870/053/000/owyxsmiy82CtwVCpV1x-o.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Form>
                    <Form.Field>
                      <label>ทะเบียนรถ</label>
                      <Input placeholder='ทะเบียนรถ' name='car_number' id='inputCarNumber' value={this.state.car_number} onChange={(e,v)=>this.handleInput(e,v)} />
                    </Form.Field>
                    <Form.Field>
                      <label>RFID</label>
                      <Input placeholder='RFID' name='rfid' id='inputRFID' value={this.state.rfid}  onChange={(e,v)=>this.handleInput(e,v)} />
                    </Form.Field>
                    <Button type='button'  onClick={()=>this.handleSubmitCheckin()} id="btnSubmitCheckin" primary>Check In</Button>
                    <Button type='button'  onClick={()=>this.handleCancelCheckin()} id="btnCancelCheckin" >Cancel</Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <ConfirmPopup open={this.state.popup_confirm_display} message={this.state.popup_confirm_message} onClose={()=>this.handleCloseAlert()} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
CheckInPoup.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmitSuccess : PropTypes.func.isRequired,
  onClose : PropTypes.func.isRequired,
  car_items: PropTypes.array.isRequired
}

export default CheckInPoup;
