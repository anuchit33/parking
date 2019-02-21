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
  it("should call productSelect", () => {
    const wrapper = shallow(<App />);
    const btnCheckin = wrapper.find('#btnCheckin');
    btnCheckin.simulate('click');
    expect(wrapper.state('display_popup_checkin')).toEqual(true)

  });

});
