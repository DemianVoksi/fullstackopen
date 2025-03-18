import { useEffect, useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/person-form';
import PersonsList from './components/persons-list';

import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredPersons, setFilteredPersons] = useState(persons);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('http://localhost:3001/persons');
				setPersons(res.data);
				setFilteredPersons(res.data);
				console.log('fetched data');
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	function checkIfNameExists(nn) {
		const result = persons.filter((per) => per.name === nn);
		if (result.length === 0) {
			return false;
		} else {
			return true;
		}
	}

	function addNewPerson(e) {
		e.preventDefault();
		checkIfNameExists(newName)
			? alert(`"${newName}" is already added to your phonebook.`)
			: setPersons([...persons, { name: newName, number: newNumber }]);
		setNewName('');
		setNewNumber('');
	}

	function handleNameChange(e) {
		e.preventDefault();
		setNewName(e.target.value);
	}

	function handleNumberChange(e) {
		e.preventDefault();
		setNewNumber(e.target.value);
	}

	function filterPersons(e) {
		e.preventDefault();
		const search = e.target.value;
		if (search === '') {
			setFilteredPersons(persons);
		} else {
			const filtered = persons.filter((person) => person.name.includes(search));
			setFilteredPersons(filtered);
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filterPersons={filterPersons} />
			<h2>Add a new person & number</h2>
			<PersonForm
				addNewPerson={addNewPerson}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<PersonsList filteredPersons={filteredPersons} />
		</div>
	);
};

export default App;
