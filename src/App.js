import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import CheckInPoup from './components/CheckinPopup'
import { Container, Header, Segment ,Statistic} from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_popup_checkin: false,
      items: [],
      disabled_btn_checkin: false,
      limit: 50
    }

  }

  componentDidMount() {

    var url = new URL(window.location.href)
    var c = url.searchParams.get("car_size")
    let items = []
    if(c){
      for(let i=0;i<50;i++){
        items.push({
          car_number: '111'+i,
          rfid: '1'+i
        })
      }
      this.setState({items: items})
    }

  }

  handelSubmitCheckin(data){
    let items = this.state.items
    items.push(data)
  }
  handelOpenCheckinPopup(){
    this.setState({display_popup_checkin: true})
  }
  handelCloseCheckinPopup(){
    this.setState({display_popup_checkin: false})
  }

  render() {
    const disabled_btn_checkin = this.state.items.length>=this.state.limit
    return (
      <Container textAlign='center' style={{width: '500px'}}>
        <br /><br />
        <Segment placeholder>
          <Header as='h1'>Parking System</Header>
          <p>
            <button className='ui big green button' id="btnCheckin" disabled={disabled_btn_checkin} onClick={()=>this.handelOpenCheckinPopup()}>Check In</button>
          </p>
          
          {/* <p>
            <Button size='big' color='red'>Check Out</Button>
          </p>

           */}

<p>
            <Statistic horizontal>
              <Statistic.Value><span id='car_amount'>{this.state.items.length}</span>/{this.state.limit}</Statistic.Value>
              <Statistic.Label>คัน</Statistic.Label>
            </Statistic>
          </p>
        </Segment>

        <CheckInPoup 
          open={this.state.display_popup_checkin}
          onSubmitSuccess={(d)=>this.handelSubmitCheckin(d)}
          onClose={()=>this.handelCloseCheckinPopup()}
           />
      </Container>
    );
  }
}

export default App;
