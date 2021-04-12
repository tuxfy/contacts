import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Contacts Table Component', () => {
	const wrapper = shallow(<App />)

  it('includes header and main section', () => {
		expect(wrapper.find('Header').length).toBeGreaterThan(0)
		expect(wrapper.find('main').length).toBeGreaterThan(0)
	})
})
