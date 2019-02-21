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
      limit: 50
    }

    this.handelOpenCheckinPopup = this.handelOpenCheckinPopup.bind(this)
    this.handelSubmitCheckin = this.handelSubmitCheckin.bind(this)
    this.handelCloseCheckinPopup = this.handelCloseCheckinPopup.bind(this)
  }

  componentDidMount() {

  }

  handelSubmitCheckin(data){
    let items = this.state.items
    items.push(data)
    //this.setState({items: items,display_popup_checkin: false})
  }
  handelOpenCheckinPopup(){
    this.setState({display_popup_checkin: true})
  }
  handelCloseCheckinPopup(){
    this.setState({display_popup_checkin: false})
  }

  render() {
    return (
      <Container textAlign='center' style={{width: '500px'}}>
        <br /><br />
        <Segment placeholder>
          <Header as='h1'>Parking System</Header>
          <p>
            <button className='ui big green button' id="btnCheckin" onClick={this.handelOpenCheckinPopup}>Check In</button>
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
          onSubmitSuccess={this.handelSubmitCheckin}
          onClose={this.handelCloseCheckinPopup}
           />
      </Container>
    );
  }
}

export default App;
