import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Modal, Button, Input, Grid, Form } from 'semantic-ui-react'
import ConfirmPopup from './ConfirmPopup';
import Api from '../Api'

class CheckInPoup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popup_confirm_message: '',
      popup_confirm_display: false,
      error: {}
    }

  }

  checkValid(){
    let error = {}
    if(this.state.rfid==null || this.state.rfid==''){
      error['rfid'] = 'ต้องไม่เป็นค่าว่าง'
    }

    if(this.state.car_number==null || this.state.car_number==''){
      error['car_number'] = 'ต้องไม่เป็นค่าว่าง'
    }

    this.setState({error: error})
    return Object.keys(error).length === 0
  }

  handleCancelCheckin(){
    this.reset()
    this.props.onClose()
  }
  async handleSubmitCheckin(){


    if(this.checkValid()==true){
      const data_post = {
        number: this.state.car_number,
        rfid: this.state.rfid
      }

      const data = await Api.post('/carlist/',data_post)
      if(data.status_code==201 || data.status_code==200){
        this.setState({
          popup_confirm_message: 'สำเร็จ',
          popup_confirm_display: true
        } )
      
        this.props.onSubmitSuccess({
          car_number: this.state.car_number,
          rfid: this.state.rfid
        })      
        console.log('onSubmitSuccess')
      }else{ console.log('onSubmitSuccess error')
        this.setState({
          error: data.data,

          popup_confirm_display: data.data.rfid!=null,
          popup_confirm_message: data.data.rfid
        })
      }
      

      this.reset()
    }
    
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
                      <label>ทะเบียนรถ <span className="red">{this.state.error.car_number}</span></label>
                      <Input placeholder='ทะเบียนรถ' name='car_number' id='inputCarNumber' value={this.state.car_number} onChange={(e,v)=>this.handleInput(e,v)} />
                    </Form.Field>
                    <Form.Field>
                      <label>RFID <span className="red">{this.state.error.rfid}</span></label>
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
