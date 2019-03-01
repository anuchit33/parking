import React from 'react';
import CheckinPopup from './CheckinPopup'
import {shallow} from 'enzyme';
global.fetch = require('jest-fetch-mock')

let wrapper,handelSubmitCheckin=jest.fn(),handleCloseAlert=jest.fn();
const props = {
  open: true,
  onSubmitSuccess:handelSubmitCheckin,
  onClose: handleCloseAlert,
  car_items: []
}
describe("render", () => {
  
    beforeEach(() => {      
      wrapper = shallow(<CheckinPopup {...props} />);  
    });

    it('renders without crashing', () => {
      expect( wrapper.find('#checkinPopup')).toHaveLength(1)
      expect( wrapper.find('#imageCheckin')).toHaveLength(1)
      expect( wrapper.find('#inputCarNumber')).toHaveLength(1)
      expect( wrapper.find('#inputRFID')).toHaveLength(1)
      expect( wrapper.find('#btnSubmitCheckin')).toHaveLength(1)
      expect( wrapper.find('#btnCancelCheckin')).toHaveLength(1)
    });
   
});

describe("event", () => {
  beforeEach(() => {
    wrapper = shallow(<CheckinPopup {...props} />);
  });

  it('simulate onChange car_number', () => {
    const wrapper = shallow(<CheckinPopup {...props} />)

    wrapper.instance().handleInput = jest.fn()
    wrapper.find('#inputCarNumber').simulate('change')
    expect(wrapper.instance().handleInput).toHaveBeenCalledTimes(1)
    wrapper.instance().handleInput.mockClear()
    
  })

  it('simulate onChange rfid', () => {
    const wrapper = shallow(<CheckinPopup {...props} />)

    wrapper.instance().handleInput = jest.fn()
    wrapper.find('#inputRFID').simulate('change')
    expect(wrapper.instance().handleInput).toHaveBeenCalledTimes(1)
    wrapper.instance().handleInput.mockClear()
    
  })

  it(" simulate onClick  btnSubmitCheckin", () => {
    
    const btnSubmitCheckin = wrapper.find('#btnSubmitCheckin');

    wrapper.instance().handleSubmitCheckin = jest.fn()
    expect(wrapper.instance().handleSubmitCheckin).toHaveBeenCalledTimes(0)

    // click button
    btnSubmitCheckin.simulate('click');
    expect(wrapper.instance().handleSubmitCheckin).toHaveBeenCalledTimes(1)
    
  });

  it(" simulate onClick  btnCancelCheckin", () => {
    
    const btnCancelCheckin = wrapper.find('#btnCancelCheckin');

    wrapper.instance().handleCancelCheckin = jest.fn()
    expect(wrapper.instance().handleCancelCheckin).toHaveBeenCalledTimes(0)

    // click button
    btnCancelCheckin.simulate('click');
    expect(wrapper.instance().handleCancelCheckin).toHaveBeenCalledTimes(1)
    
  });


});

describe("call function", () => {
  beforeEach(() => {
    wrapper = shallow(<CheckinPopup {...props} />);
  });
  it('Unittest handleInput car_number', () => {
   
    const value = '1111'
    const e = {},v = {value: value,name: 'car_number'}    
    wrapper.instance().handleInput(e,v)
    expect(wrapper.state('car_number')).toBe(value)
  })

  it('Unittest handleInput rfid', () => {
   
    const value = '1'
    const e = {},v = {value: value,name: 'rfid'}    
    wrapper.instance().handleInput(e,v)

    expect(wrapper.state('rfid')).toBe(value)
  })

  it('Unittest handleSubmitCheckin', async () => {

    const e = {}   
    fetch.mockResponseOnce(JSON.stringify([{number: 1111,rfid: 1}]))
    wrapper.setState({'rfid': 1,'car_number': '1111'})

    await wrapper.instance().handleSubmitCheckin() //
    expect(props.onSubmitSuccess).toHaveBeenCalledTimes(1)     
    
    expect(props.onSubmitSuccess.mock.calls[0][0]).toEqual({ car_number: '1111', rfid: 1})
    
    expect(wrapper.state('car_number')).toBe('')
    expect(wrapper.state('rfid')).toBe('')

    props.onSubmitSuccess.mockClear()
    
  })


  it('Unittest handleSubmitCheckin RFID duplicate', async () => {

    const e = {}   
    fetch.mockResponses(
      [
        JSON.stringify({rfid: 'RFID 1 ถูกใช้งานแล้ว'}),
        { status: 400 }
      ])
    wrapper.setState({'rfid': 1,'car_number': '1111'})

    await wrapper.instance().handleSubmitCheckin() //
    expect(props.onSubmitSuccess).toHaveBeenCalledTimes(0)
    expect(wrapper.state('error').rfid).toBe('RFID 1 ถูกใช้งานแล้ว')

    props.onSubmitSuccess.mockClear()
    
  })

  it('Unittest handleCloseAlert and call props onClose', () => {

    wrapper.instance().handleCloseAlert() // 
    expect(props.onClose).toHaveBeenCalledTimes(1) 
    props.onClose.mockClear()
    
  })

  it('Unittest handleCancelCheckin and call props onClose', () => {

    wrapper.instance().handleCancelCheckin() // 
    expect(props.onClose).toHaveBeenCalledTimes(1) 
    props.onClose.mockClear()

    expect(wrapper.state('car_number')).toBe('')
    expect(wrapper.state('rfid')).toBe('')
    
  })

  it('Unittest checkValid return true', () => {

    const wrapper = shallow(<CheckinPopup {...props} />) 
    wrapper.setState({'car_number': '111',rfid:'1'} )
    
    // state confirm popup error
    expect(wrapper.instance().checkValid()).toBe(true)
    
  })
  it('Unittest checkValid return false', () => {
    const wrapper = shallow(<CheckinPopup {...props} />) 

    // rfid is none
    wrapper.setState({'car_number': '111',rfid:''} )
    expect(wrapper.instance().checkValid()).toBe(false)
    expect(wrapper.state('error').rfid).toBe('ต้องไม่เป็นค่าว่าง')

    // name is none
    wrapper.setState({'rfid': '1',car_number: ''} )
    expect(wrapper.instance().checkValid()).toBe(false)
    expect(wrapper.state('error').car_number).toBe('ต้องไม่เป็นค่าว่าง')
  })
})