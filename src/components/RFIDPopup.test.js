import React from 'react';
import RFIDPopup from './RFIDPopup'
import { shallow } from 'enzyme';

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

});

