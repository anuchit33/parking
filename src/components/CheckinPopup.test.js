import React from 'react';
import CheckinPopup from './CheckinPopup'
import {shallow} from 'enzyme';

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

  it('Unittest handleSubmitCheckin', () => {

    const e = {}   
    wrapper.instance().handleInput(e,{value: '111',name: 'car_number'} )
    wrapper.instance().handleInput(e,{value: '1',name: 'rfid'} )

    wrapper.instance().handleSubmitCheckin() // 
    expect(props.onSubmitSuccess).toHaveBeenCalledTimes(1) 
    
    expect(props.onSubmitSuccess.mock.calls[0][0]).toEqual({ car_number: '111', rfid: '1' })
    
    expect(wrapper.state('car_number')).toBe('')
    expect(wrapper.state('rfid')).toBe('')

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
    
  })

  it('Unittest handleSubmitCheckin rfid duplicate fail', () => {
    props['car_items'].push( {
      car_number: '113',
      rfid: '1'
    })
    const e = {}
    const wrapper = shallow(<CheckinPopup {...props} />) 
    wrapper.instance().handleInput(e,{value: '111',name: 'car_number'} )
    wrapper.instance().handleInput(e,{value: '1',name: 'rfid'} )

    wrapper.instance().handleSubmitCheckin() // 
    
    // not call onSubmitSuccess
    expect(props.onSubmitSuccess).toHaveBeenCalledTimes(0) 
    
    expect(wrapper.state('car_number')).toBe('')
    expect(wrapper.state('rfid')).toBe('')

    // state confirm popup error
    expect(wrapper.state('popup_confirm_display')).toBe(true)
    expect(wrapper.state('popup_confirm_message')).toBe('ผิดพลาก RFID 1 ถูกใช้งานแล้ว')
    
  })
});

