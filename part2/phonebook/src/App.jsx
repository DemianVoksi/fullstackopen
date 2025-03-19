import { useEffect, useState } from 'react';
import { addData, getData } from './backend/backendFunctions';
import Filter from './components/filter';
import PersonForm from './components/person-form';
import PersonsList from './components/persons-list';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredPersons, setFilteredPersons] = useState(persons);

	const fetchData = async () => {
		const data = await getData();
		setPersons(data);
		setFilteredPersons(data);
	};

	useEffect(() => {
		const trigger = async () => {
			await fetchData();
		};
		trigger();
	}, []);

	function checkIfNameExists(nn) {
		const result = persons.filter((per) => per.name === nn);
		if (result.length === 0) {
			return false;
		} else {
			return true;
		}
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

	async function addNewPerson(e) {
		e.preventDefault();
		checkIfNameExists(newName)
			? alert(`"${newName}" is already added to your phonebook.`)
			: await addData(newName, newNumber);
		setNewName('');
		setNewNumber('');
		await fetchData();
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
