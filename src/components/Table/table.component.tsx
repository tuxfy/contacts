import React, { useEffect, useState } from 'react'
import { FC } from 'react'

import './table.styles.scss'
import { IPerson } from '../../utils/ldap.util'
import Input from '../Input/input.component'

interface ITable {
	data: IPerson[]
	properties: ITableHeader[]
}

export interface ITableHeader {
	headertext: string
	property: string
	tag: string
	href: string
	order: number
}

const Table: FC<ITable> = ({ data }) => {
	const [searchValue, setSearchValue] = useState('')

	const filterData = (searchValue: string) => {
		setSearchValue(searchValue)
	}

	return (
		<>
			<Input id="searchInput" inputKeyUpFunc={filterData} icon="🔎" />
			<table>
				<tbody>
					{data
						.filter(obj => {
								let objectValues = Object.values(obj)
								let objectString = JSON.stringify(objectValues).toLocaleLowerCase()
								return objectString.includes(searchValue.toLocaleLowerCase())
						})
						.map(obj => (
							<tr key={obj.objectguid}>
								<td>{obj.displayname}</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	)
}

export default Table
