import React from 'react';
import RFIDPopup from './RFIDPopup'
import { shallow } from 'enzyme';

let wrapper, handleClosePopup=jest.fn();
const props = {
  car_items: [],
  onClose: handleClosePopup,
}
describe("render", () => {
  it('renders without crashing', () => {

    const wrapper = shallow(<RFIDPopup {...props} />);
    expect(wrapper.find('#rfidPopup')).toHaveLength(1)
    expect(wrapper.find('#inputRFID')).toHaveLength(1)
  });
});

describe("event", () => {


});

