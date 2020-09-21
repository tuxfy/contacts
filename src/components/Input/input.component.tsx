import React from 'react'
import { FC, KeyboardEvent } from 'react'

import './input.styles.scss'

interface IInput {
	inputKeyUpFunc?: (param: string) => void
	inputEnterFunc?: (param: string) => void
	placeholder?: string
	id?: string
	icon?: string
}

const Input: FC<IInput> = ({ inputEnterFunc, inputKeyUpFunc, icon, placeholder }) => {
	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputEnterFunc) {
			inputEnterFunc(e.currentTarget.value)
		} else if (e.key !== 'Enter' && inputKeyUpFunc) {
			inputKeyUpFunc(e.currentTarget.value)
		}
	}

	const getInput = () => {
		return <input type="text" onKeyUp={handleKeyUp} placeholder={placeholder} />
	}

	const getInputContainer = () => {
		return (
			<div className="inputContainer">
				{getInput()}
				<i>{icon}</i>
			</div>
		)
	}

	const getElement = () => {
		if (icon) {
			return getInputContainer()
		} else {
			return getInput()
		}
	}

	return <>{getElement()}</>
}

export default Input
