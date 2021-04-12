import testPersonData from './testPersonData.json'
import testOrganisationData from './testOrganisationData.json'

export interface IPerson {
	person_guid: string
	displayname: string
	office?: string
	company: string
	telephone: string
	fulltelephonenumber: string
	facsimiletelephone: string
	objectguid: string
}

interface Person {
	getPersons: () => Promise<IPerson[]>
}

let persons: IPerson[] = []

export const Person: Person = {
	getPersons: async (): Promise<IPerson[]> => {
		const storedPersons = sessionStorage.getItem('persons')
		if (storedPersons !== null && storedPersons.length > 0) {
			persons = JSON.parse(storedPersons)
		} else {
			let headers = new Headers()
			headers.append('Accept', 'application/json')
			headers.append('Origin', 'http://localhost:8888/?persons=1')

			const resp = await fetch('http://localhost:8888/?persons=1', {
				// mode: 'cors',
				method: 'POST',
				headers: headers,
			})
				.then(async response => {
					persons = await response.json()
				})
				.catch(error => {
					console.log('getLdapPersons fetch data -> error', error)
					persons = testPersonData
				})
			sessionStorage.setItem('persons', JSON.stringify(persons))
		}
		return persons
	},
}

interface IOrganisation {
	name: string
	ou: string
}

interface Organisation {
	getOrganisations: () => Promise<IOrganisation[]>
}

let organisations: IOrganisation[] = []

export const Organisation: Organisation = {
	getOrganisations: async (): Promise<IOrganisation[]> => {
		const storedOrgs = sessionStorage.getItem('organisations')
		if (storedOrgs !== null && storedOrgs.length > 0) {
			organisations = JSON.parse(storedOrgs)
		} else {
			let headers = new Headers()
			headers.append('Accept', 'application/json')
			headers.append('Origin', 'http://localhost:8888/?organisations=1')

			const resp = await fetch('http://localhost:8888/?organisations=1', {
				// mode: 'cors',
				method: 'POST',
				headers: headers,
			})
				.then(async response => {
					organisations = await response.json()
				})
				.catch(error => {
					console.log('getLdapOrganisations fetch data -> error', error)
					organisations = testOrganisationData
				})
			sessionStorage.setItem('organisations', JSON.stringify(organisations))
		}
		return organisations
	},
}
