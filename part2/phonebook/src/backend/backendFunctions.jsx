import axios from 'axios';

export const getData = async () => {
	try {
		const res = await axios.get('/api/persons');
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const addData = async (newName, newNumber, setMessage) => {
	try {
		await axios.post('/api/persons', {
			name: newName,
			number: newNumber,
		});
		setMessage({ type: 'add', content: `Added ${newName}` });
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
	} catch (error) {
		setMessage({
			type: 'error',
			content: error.response.data.includes('ValidationError')
				? error.response.data
						.split('<pre>')[1]
						.split('</pre')[0]
						.split('<br>')[0]
				: 'An error occured',
		});
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
		console.log(error);
	}
};

export const removeData = async (id, setMessage, name) => {
	try {
		await axios.delete(`/api/persons/${id}`);
		setMessage({ type: 'delete', content: `Deleted ${name}` });
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
		return true;
	} catch (error) {
		console.error(error);
		setMessage({
			type: 'error',
			content: `Information of ${name} has already been removed from the server.`,
		});
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
		return false;
	}
};

export const editData = async (id, name, number, setMessage) => {
	try {
		await axios.put(`/api/persons/${id}`, {
			name: name,
			number: number,
		});
		setMessage({ type: 'edit', content: `Edited ${name}` });
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
	} catch (error) {
		setMessage({
			type: 'error',
			content: error.response.data.includes('ValidationError')
				? error.response.data
						.split('<pre>')[1]
						.split('</pre')[0]
						.split('<br>')[0]
				: 'An error occured',
		});
		setTimeout(() => {
			setMessage({ type: null, content: null });
		}, 3000);
		console.error(error);
	}
};
