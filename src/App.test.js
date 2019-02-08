import React from 'react';
import App from './App';
import {shallow,mount,render} from 'enzyme';

// configure({adapter: new Adapter()});
describe("render", () => {
  it('renders without crashing', () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
    const wrapper = mount(<App />);
    expect(wrapper.state('products').length).toEqual(3);
  });

});

describe("handleProductSelect", () => {
  it("test call", () => {
    const wrapper = shallow(<App />);
    const p = {id:1,name:'aaa',brand:'Nike'}
    wrapper.instance().handleProductSelect(p)
    expect(wrapper.state('selectedProducts')).toEqual([p])

  });
});
