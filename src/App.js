import React, { useEffect, useState } from 'react'
import './App.css'

import { Person, Organisation } from './utils/ldap.util'
import Header from './components/Header/header.component'
import Table from './components/Table/table.component'

const App = () => {
	const [persons, setPersons] = useState([])
	const [organisations, setOrganisations] = useState([])

	useEffect(() => {
		Person.getPersons().then(data => {
			console.log('App -> data', data)
			setPersons(data)
		})

		Organisation.getOrganisations().then(data => {
			console.log('App -> data', data)
			setOrganisations(data)
		})
	}, [])

	return (
		<>
			<Header />
			<main>
				<Table data={persons} />
			</main>
		</>
	)
}

export default App
