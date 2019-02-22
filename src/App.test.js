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

});
