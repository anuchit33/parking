import React from 'react';
import CheckinPopup from './CheckinPopup'
import {shallow} from 'enzyme';

let wrapper,handelSubmitCheckin=jest.fn(),handelCloseCheckout=jest.fn();
const props = {
  open: true,
  onSubmitSuccess:handelSubmitCheckin,
  onClose: handelCloseCheckout
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


  it('Unittest handleInput car_number', () => {
   
    const value = '1111'
    const e = {}
    const v = {value: value,name: 'car_number'}    
    wrapper.instance().handleInput(e,v)

    expect(wrapper.state('car_number')).toBe(value)
  })
});

