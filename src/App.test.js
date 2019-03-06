import React from 'react';
import App from './App'
import { shallow, mount } from 'enzyme';
import CheckInPoup from './components/CheckinPopup'
import RFIDPopup from './components/RFIDPopup'
global.fetch = require('jest-fetch-mock')

describe("render", () => {
  it('renders without crashing', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('#btnCheckin')).toHaveLength(1)
    expect(wrapper.find('#btnCheckout')).toHaveLength(1)
    expect(wrapper.find(CheckInPoup)).toHaveLength(1)
    expect(wrapper.find(RFIDPopup)).toHaveLength(1)
    expect(wrapper.find('#car_amount')).toHaveLength(1)
    expect(wrapper.find('#car_amount').text()).toEqual('0')
  });

  it('renders car 50item to disabled btnCheckin', () => {
    const wrapper = mount(<App />);

    // auto add car 50 item
    let items = []
    for(let i=0;i<50;i++)
      items.push({car_number: '11'+i,rfid: '1'+i})
    wrapper.setState({items: items})
    
    // car item = 50
    expect(wrapper.state('items').length).toBe(50)

    setTimeout(()=>{
      const btnCheckin = wrapper.find('#btnCheckin')
      expect(btnCheckin.prop('disabled')).toBe(false)
    },100)
    
    
  });
});

it('renders car 50item to show alert', () => {
  const wrapper = mount(<App />);

  expect(wrapper.find('#lebelAlert')).toHaveLength(0)

  // auto add car 50 item
  let items = []
  for(let i=0;i<50;i++)
    items.push({car_number: '11'+i,rfid: '1'+i})
  wrapper.setState({items: items})
  
  // car item = 50
  expect(wrapper.state('items').length).toBe(50)
  
  setTimeout(()=>{expect(wrapper.find('#lebelAlert')).toHaveLength(1)},100)
  
  
});

describe("event", () => {
  it(" simulate onClick  btnCheckin", () => {
    const wrapper = shallow(<App />);

    wrapper.instance().handelOpenCheckinPopup = jest.fn()
    const btnCheckin = wrapper.find('#btnCheckin');
    expect(wrapper.instance().handelOpenCheckinPopup).toHaveBeenCalledTimes(0)

    // click button
    btnCheckin.simulate('click');
    expect(wrapper.instance().handelOpenCheckinPopup).toHaveBeenCalledTimes(1)
    
  });

  it(" simulate onClick  btnCheckout", () => {
    const wrapper = shallow(<App />);

    wrapper.instance().handelOpenRFIDPopup = jest.fn()
    const btnCheckout = wrapper.find('#btnCheckout');
    expect(wrapper.instance().handelOpenRFIDPopup).toHaveBeenCalledTimes(0)

    // click button
    btnCheckout.simulate('click');
    expect(wrapper.instance().handelOpenRFIDPopup).toHaveBeenCalledTimes(1)
    
  });

  it('Unittest handelOpenCheckinPopup', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().handelOpenCheckinPopup()

    // display_popup_checkin is True
    expect(wrapper.state('display_popup_checkin')).toBe(true)
  })

  it('Unittest handelSubmitCheckin', () => {
    const wrapper = shallow(<App />)

    wrapper.instance().updateCounter = jest.fn()
    wrapper.instance().handelSubmitCheckin({car_number: '111',rfid: '1'})

    expect(wrapper.instance().updateCounter).toHaveBeenCalledTimes(1)
    
  })

  it('Unittest handelCloseCheckinPopup', () => {
    const wrapper = shallow(<App />)

    // befor call handelCloseCheckinPopup
    wrapper.instance().setState({display_popup_checkin: true})
    expect(wrapper.state('display_popup_checkin')).toBe(true)

    wrapper.instance().handelCloseCheckinPopup()

    // display_popup_checkin is False
    expect(wrapper.state('display_popup_checkin')).toBe(false)
  })

  it('Unittest handelCloseRFIDPopup', () => {
    const wrapper = shallow(<App />)

    // befor call handelCloseCheckinPopup
    wrapper.instance().setState({display_popup_checkin: true})
    expect(wrapper.state('display_popup_rfid')).toBe(true)

    wrapper.instance().handelCloseCheckinPopup()

    // display_popup_checkin is False
    expect(wrapper.state('display_popup_rfid')).toBe(false)
  })
  

  it('Unittest handelOpenRFIDPopup', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.state('display_popup_rfid')).toBe(false)

    // call handelOpenRFIDPopup
    wrapper.instance().handelOpenRFIDPopup()

    // display_popup_checkin is False
    expect(wrapper.state('display_popup_rfid')).toBe(true)
  })
});


describe("cll api", () => {

  fetch.mockResponseOnce(JSON.stringify({ count: 1 }))

  const wrapper = shallow(<App />)

    // befor call handelCloseCheckinPopup
    wrapper.instance().setState({count: 0})
    expect(wrapper.state('count')).toBe(0)

    wrapper.instance().updateCounter()

    setTimeout(()=>{
      expect(wrapper.state('count')).toBe(1)
    },100) 

})
