import axios from 'axios';

export const getData = async () => {
	try {
		const res = await axios.get('http://localhost:3001/persons');
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const addData = async (newName, newNumber) => {
	try {
		await axios.post('http://localhost:3001/persons', {
			name: newName,
			number: newNumber,
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeData = async (id) => {
	try {
		await axios.delete(`http://localhost:3001/persons/${id}`);
	} catch (error) {
		console.error(error);
	}
};

export const editData = async (id, name, number) => {
	try {
		await axios.put(`http://localhost:3001/persons/${id}`, {
			name: name,
			number: number,
		});
	} catch (error) {
		console.error(error);
	}
};
