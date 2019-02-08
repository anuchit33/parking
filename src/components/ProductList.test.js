import React from 'react';
import ProductList from './ProductList';
import {shallow} from 'enzyme';

let mockProducts, wrapper, productSelectFn;
describe("render", () => {
  beforeEach(() => {
    mockProducts = [
      {id:1,name:'test1',brand:'A'},
      {id:2,name:'test2',brand:'B'},
      {id:3,name:'test3',brand:'C'},
    ];

    productSelectFn = jest.fn();

    wrapper = shallow(<ProductList products={mockProducts} onProductSelect={productSelectFn} />);

  });
  it("should render a list of product", () => {
    expect(wrapper.find('li').length).toEqual(mockProducts.length);
  });
  it("should render a list of product name", () => {
    expect(wrapper.find('li').at(0).contains(mockProducts[0].name)).toEqual(true);
  });

  it("should render a list of product brand", () => {
    expect(wrapper.find('li').at(0).contains(mockProducts[0].brand)).toEqual(true);
    expect(wrapper.find('li').at(0).text()).toEqual(mockProducts[0].name + " : " + mockProducts[0].brand);
  });


});

describe("event", () => {
  beforeEach(() => {
    mockProducts = [
      {id:1,name:'test1',brand:'A'},
      {id:2,name:'test2',brand:'B'},
      {id:3,name:'test3',brand:'C'},
    ];

    productSelectFn = jest.fn();

    wrapper = shallow(<ProductList products={mockProducts} onProductSelect={productSelectFn} />);

  });
  it("should call productSelect", () => {
    const firstElement = wrapper.find('li').first();
    expect(productSelectFn.mock.calls.length).toEqual(0);
    firstElement.simulate('click');
    expect(productSelectFn.mock.calls.length).toEqual(1);
    expect(productSelectFn.mock.calls[0][0].name).toEqual(mockProducts[0].name)
  });

  afterEach(() => {
    productSelectFn.mockReset();
  });

});
