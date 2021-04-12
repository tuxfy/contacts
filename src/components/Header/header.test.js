import React from 'react';
import Header from './header.component';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const titleText = 'Contacts'

describe('Contacts Table Component', () => {
  const wrapper = shallow(<Header />);

  it('shows correct title', () => {
    expect(wrapper.find('h1').text()).toEqual(titleText)
  });  
}); 