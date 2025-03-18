import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

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
			: setPersons([...persons, { name: newName }]);
		setNewName('');
	}

	function handleNameChange(e) {
		e.preventDefault();
		setNewName(e.target.value);
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNewPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person, index) => (
				<p key={index}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
