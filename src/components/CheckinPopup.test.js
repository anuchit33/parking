import React from 'react';
import CheckinPopup from './CheckinPopup'
import {shallow} from 'enzyme';

let wrapper,handelSubmitCheckin,handelCloseCheckout;
describe("render", () => {
  
    beforeEach(() => {
      handelSubmitCheckin = jest.fn();
      handelCloseCheckout = jest.fn();
      wrapper = shallow(<CheckinPopup open={true} onSubmitSuccess={handelSubmitCheckin} onClose={handelCloseCheckout} />);
  
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
    handelSubmitCheckin = jest.fn();
    handelCloseCheckout = jest.fn();
    wrapper = shallow(<CheckinPopup open={true} onSubmitSuccess={handelSubmitCheckin} onClose={handelCloseCheckout} />);
  });
  it("should call submit check in", () => {
    const btnSubmitCheckin = wrapper.find('#btnSubmitCheckin');
    expect(handelSubmitCheckin.mock.calls.length).toEqual(0);
    btnSubmitCheckin.simulate('click');
    expect(wrapper.state('popup_confirm_display')).toEqual(true)
    expect(wrapper.state('popup_confirm_message')).toEqual('สำเร็จ')
    expect(handelSubmitCheckin.mock.calls.length).toEqual(1);

  });
});

