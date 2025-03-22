import axios from 'axios';

export const getData = async () => {
	try {
		const res = await axios.get('http://localhost:3001/api/persons');
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const addData = async (newName, newNumber, setMessage) => {
	try {
		await axios.post('http://localhost:3001/api/persons', {
			name: newName,
			number: newNumber,
		});
		setMessage({ type: 'add', content: `Added ${newName}` });
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
	} catch (error) {
		console.log(error);
	}
};

export const removeData = async (id, setMessage, name) => {
	try {
		await axios.delete(`http://localhost:3001/api/persons/${id}`);
	} catch (error) {
		console.error(error);
		setMessage({
			type: 'error',
			content: `Information of ${name} has already been removed from the server.`,
		});
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
	}
};

export const editData = async (id, name, number, setMessage) => {
	try {
		await axios.put(`http://localhost:3001/api/persons/${id}`, {
			name: name,
			number: number,
		});
		setMessage({ type: 'edit', content: `Edited ${name}` });
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
	} catch (error) {
		console.error(error);
	}
};
