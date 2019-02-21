import React from 'react';
import ConfirmPopup from './ConfirmPopup'
import { shallow } from 'enzyme';

let wrapper, onClose;

describe("render", () => {

  beforeEach(() => {
    onClose = jest.fn();
    wrapper = shallow(<ConfirmPopup open={true} message='สำเร็จ' onClose={onClose} />);
  })
  it('renders without crashing', () => {
    expect(wrapper.find('#alert_message')).toHaveLength(1)
  });
});

describe("event", () => {
  beforeEach(() => {
    onClose = jest.fn();
    wrapper = shallow(<ConfirmPopup open={true} message='สำเร็จ' onClose={onClose} />);
  });

  it("should click ok state is close", () => {
    const btnAlertOK = wrapper.find('#btnAlertOK');
    expect(onClose.mock.calls.length).toEqual(0);
    btnAlertOK.simulate('click');
    expect(onClose.mock.calls.length).toEqual(1);

  });

  afterEach(() => {
    onClose.mockReset();
  });
});

