import React from 'react';
import App from './App'
import { shallow, mount } from 'enzyme';
import CheckInPoup from './components/CheckinPopup'

describe("render", () => {
  it('renders without crashing', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('#btnCheckin')).toHaveLength(1)
    expect(wrapper.find(CheckInPoup)).toHaveLength(1)
    expect(wrapper.find('#car_amount')).toHaveLength(1)
    expect(wrapper.find('#car_amount').text()).toEqual('0')
  });

  it('renders car 50item to disabled btnCheckin', () => {
    const wrapper = mount(<App />);

    // auto add car 50 item
    for(let i=0;i<50;i++)
      wrapper.instance().handelSubmitCheckin({car_number: '11'+i,rfid: '1'+i})
    
    // car item = 50
    expect(wrapper.state('items').length).toBe(50)

    const btnCheckin = wrapper.find('#btnCheckin')
    expect(btnCheckin.prop('disabled')).toBe(false)
    
  });
});

it('renders car 50item to show alert', () => {
  const wrapper = mount(<App />);

  expect(wrapper.find('#lebelAlert')).toHaveLength(0)

  // auto add car 50 item
  for(let i=0;i<50;i++)
    wrapper.instance().handelSubmitCheckin({car_number: '11'+i,rfid: '1'+i})
  
  // car item = 50
  expect(wrapper.state('items').length).toBe(50)

  expect(wrapper.find('#lebelAlert')).toHaveLength(1)
  
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

  it('Unittest handelOpenCheckinPopup', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().handelOpenCheckinPopup()

    // display_popup_checkin is True
    expect(wrapper.state('display_popup_checkin')).toBe(true)
  })

  it('Unittest handelSubmitCheckin', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().handelSubmitCheckin({car_number: '111',rfid: '1'})

    // car item = 1
    expect(wrapper.state('items').length).toBe(1)
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
});
