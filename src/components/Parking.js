import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container,Button,Header,Segment } from 'semantic-ui-react'


class Parking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_popup_checkin: false
    }
  }

  componentDidMount() {

    }


  render() {
    return (
      <Container textAlign='center'>
        <br/><br/>
        <Segment>
          <Header as='h1'>Parking System</Header>
          <p>
            <Button size='big' color='green' id="btnCheckin">Check In</Button>
          </p>
          <p>
            <Button size='big' color='red'>Check Out</Button>
          </p>
        </Segment>
      </Container>
    );
  }
}

export default Parking;
