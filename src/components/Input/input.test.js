import React from 'react'
import Input from './input.component'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const inputText = 'some random input text'
const placeholderText = 'placeholder'
const icon = '🔎'
let result = ''

const testFunc = value => {
	result = value
}

describe('Simple Input Component', () => {
	const simpleInput = shallow(<Input />)

	it('shows just a simple input', () => {
		expect(simpleInput.find('input').length).toEqual(1)
		expect(simpleInput.find('.inputContainer').length).toEqual(0)
		expect(simpleInput.find('.inputContainer i').length).toEqual(0)
		expect(simpleInput.find('input').prop('placeholder')).toEqual(undefined)
	})

	it('has no key events', () => {
		result = ''
		simpleInput.find('input').simulate('change', { target: { value: inputText } })
		simpleInput.find('input').simulate('keypress', { key: 'Enter' })
		expect(result).toEqual('')
	})
})

describe('Enter Input Component', () => {
	const enterInput = shallow(
		<Input placeholder={placeholderText} inputEnterFunc={testFunc} icon={icon} />
	)

	it('shows just a well formatted input', () => {
		expect(enterInput.find('input').length).toEqual(1)
		expect(enterInput.find('.inputContainer').length).toEqual(1)
		expect(enterInput.find('.inputContainer i').text()).toEqual(icon)
		expect(enterInput.find('input').prop('placeholder')).toEqual(placeholderText)
	})

	it('executes a on enter event', () => {
		result = ''
		enterInput.find('input').simulate('change', { currentTarget: { value: inputText } })
		enterInput
			.find('input')
			.simulate('keyup', { key: 'Enter', currentTarget: { value: inputText } })
		expect(result).toEqual(inputText)
	})

	it('not executes a on non enter event', () => {
		result = ''
		enterInput.find('input').simulate('change', { currentTarget: { value: inputText } })
		enterInput.find('input').simulate('keyup', { key: 'x', currentTarget: { value: inputText } })
		expect(result).toEqual('')
	})
})

describe('KeyUp Input Component', () => {
	const keyUpInput = shallow(
		<Input placeholder={placeholderText} inputKeyUpFunc={testFunc} icon={icon} />
	)

	it('shows just a well formatted input', () => {
		expect(keyUpInput.find('input').length).toEqual(1)
		expect(keyUpInput.find('.inputContainer').length).toEqual(1)
		expect(keyUpInput.find('.inputContainer i').text()).toEqual(icon)
		expect(keyUpInput.find('input').prop('placeholder')).toEqual(placeholderText)
	})

	it('not executes a on enter event', () => {
		result = ''
		keyUpInput.find('input').simulate('change', { currentTarget: { value: inputText } })
		keyUpInput
			.find('input')
			.simulate('keyup', { key: 'Enter', currentTarget: { value: inputText } })
		expect(result).toEqual('')
	})

	it('not executes a on non enter event', () => {
		result = ''
		keyUpInput.find('input').simulate('change', { currentTarget: { value: inputText } })
		keyUpInput.find('input').simulate('keyup', { key: 'x', currentTarget: { value: inputText } })
		expect(result).toEqual(inputText)
	})
})
