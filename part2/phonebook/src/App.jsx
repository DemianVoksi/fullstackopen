import { useEffect, useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/person-form';
import PersonsList from './components/persons-list';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '070 000 0000', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredPersons, setFilteredPersons] = useState(persons);

	useEffect(() => {
		setFilteredPersons(persons);
	}, [persons]);

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
