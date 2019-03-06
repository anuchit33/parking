import React, { Component } from 'react';
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import CheckInPoup from './components/CheckinPopup'
import RFIDPopup from './components/RFIDPopup'
import CheckoutPopup from './components/CheckoutPopup'
import { Container, Header, Segment ,Statistic,Message} from 'semantic-ui-react'
import Api from './Api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_popup_checkin: false,
      items: [],
      disabled_btn_checkin: false,
      limit: 50,
      display_popup_rfid: false,
      count: 0,
      checkout_data: {}
    }

  }

  componentDidMount() {
    this.updateCounter()
  }

  async updateCounter(){

    const data = await Api.get('/carlist/')
    this.setState({ 
      count: data.data.length ,
      items: data.data
    });
    

  }
  handelSubmitCheckin(data){
    this.updateCounter()
  }
  handelOpenCheckinPopup(){
    this.setState({display_popup_checkin: true})
  }
  handelCloseCheckinPopup(){
    this.setState({display_popup_checkin: false})
  }

  handelOpenRFIDPopup(){

    this.setState({
      display_popup_rfid: true
    })
  }

  handelCloseRFIDPopup(){
    this.setState({
      display_popup_rfid: false
    })
  }

  handelRFIDData(data){
    this.setState({
      display_popup_checkout: true,
      checkout_data: data,
      display_popup_rfid: false
    })
  }

  handelCloseCheckoutPopup(){
    this.setState({
      display_popup_checkout: false
    })
  }

  render() {
    const disabled_btn_checkin = this.state.items.length>=this.state.limit
    return (
      <Container textAlign='center' style={{width: '500px'}}>
        <br /><br />
        <Segment placeholder>
          <Header as='h1'>Parking System Test Edit</Header>
          {disabled_btn_checkin &&   
          <Message negative id='lebelAlert'>
            <p>รถเต็มแล้ว</p>
          </Message>}
          <p>
            <button className='ui big green button' id="btnCheckin" disabled={disabled_btn_checkin} onClick={()=>this.handelOpenCheckinPopup()}>Check In</button>
          </p>

          <p>
            <button className='ui big red button' id="btnCheckout" onClick={()=>this.handelOpenRFIDPopup()}>Check Out</button>
          </p>          
          <p>
            <Statistic horizontal>
              <Statistic.Value><span id='car_amount'>{this.state.count}</span>/{this.state.limit}</Statistic.Value>
              <Statistic.Label>คัน</Statistic.Label>
            </Statistic>
          </p>
        </Segment>

        <CheckInPoup 
          open={this.state.display_popup_checkin}
          onSubmitSuccess={(d)=>this.handelSubmitCheckin(d)}
          onClose={()=>this.handelCloseCheckinPopup()}
          car_items={this.state.items}
           />
        <CheckoutPopup
          onClose={()=>this.handelCloseCheckoutPopup()}
          open={this.state.display_popup_checkout}
          data={this.state.checkout_data} />
        <RFIDPopup 
          onClose={()=>this.handelCloseRFIDPopup()}
          car_items={this.state.items}
          open={this.state.display_popup_rfid}
          onData={(d)=>this.handelRFIDData(d)}
          />
      </Container>
    );
  }
}

export default App;
