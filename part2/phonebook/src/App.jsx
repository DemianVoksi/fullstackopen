import { useEffect, useState } from 'react';
import { addData, editData, getData } from './backend/backendFunctions';
import Filter from './components/filter';
import Notification from './components/notification';
import PersonForm from './components/person-form';
import PersonsList from './components/persons-list';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredPersons, setFilteredPersons] = useState(persons);
	const [message, setMessage] = useState({ type: null, content: null });

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

	async function handleAddData() {
		await addData(newName, newNumber, setMessage);
	}

	async function handleEditData() {
		const existingUser = persons.filter((person) => person.name === newName);
		alert(
			`${newName} is already added to your phonebook, replace the old number with the new one?`
		);
		await editData(
			existingUser[0]._id,
			existingUser[0].name,
			newNumber,
			setMessage
		);
	}

	async function addNewPerson(e) {
		e.preventDefault();
		checkIfNameExists(newName) ? await handleEditData() : await handleAddData();
		setNewName('');
		setNewNumber('');
		await fetchData();
	}

	return (
		<div>
			<Notification message={message} />
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
			<PersonsList
				filteredPersons={filteredPersons}
				fetchData={fetchData}
				setMessage={setMessage}
			/>
		</div>
	);
};

export default App;
