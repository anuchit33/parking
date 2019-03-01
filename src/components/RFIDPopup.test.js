import React from 'react';
import RFIDPopup from './RFIDPopup'
import { shallow } from 'enzyme';
global.fetch = require('jest-fetch-mock')

let wrapper, handleClosePopup=jest.fn();
const props = {
  car_items: [],
  onClose: handleClosePopup,
  open: true
}
describe("render", () => {

  it('renders without crashing', () => {

    wrapper = shallow(<RFIDPopup {...props} />);
    expect(wrapper.find('#inputRFID')).toHaveLength(1)
  });
});

describe("event", () => {
  it('simulate onChange inputRFID', () => {
    const wrapper = shallow(<RFIDPopup {...props} />)

    wrapper.instance().handleInput = jest.fn()
    wrapper.find('#inputRFID').simulate('change')
    expect(wrapper.instance().handleInput).toHaveBeenCalledTimes(1)
    wrapper.instance().handleInput.mockClear()
    
  })

  it('Unittest handleInput rfid', () => {
   
    const value = '1'
    const e = {},v = {value: value,name: 'rfid'}    
    wrapper.instance().handleInput(e,v)

    expect(wrapper.state('rfid')).toBe(value)
  })

  it('Unittest handleInput rfid enter', () => {
    const wrapper = shallow(<RFIDPopup {...props} />)

    wrapper.instance().handleSubmitRFID = jest.fn()
    wrapper.find('#inputRFID').simulate('keyup', {key: 13})
    expect(wrapper.instance().handleSubmitRFID).toHaveBeenCalledTimes(1)

    wrapper.instance().handleSubmitRFID.mockClear()
  });

  it('Unittest handleSubmitRFID call api', async () => {
    fetch.mockResponseOnce(JSON.stringify([{number: '1111',rfid: 1,id: 1}]))


    const wrapper = shallow(<RFIDPopup {...props} />)
    wrapper.setState({rfid: 1})
    await wrapper.instance().handleSubmitRFID({keyCode: 13})

    expect(wrapper.state('carlist').number).toBe('1111')
    expect(wrapper.state('carlist').rfid).toBe(1)
  });
});

