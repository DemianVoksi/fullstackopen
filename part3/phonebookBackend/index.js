const express = require('express');
const cors = require('cors');
const { requestLogger, errorHandler } = require('./middleware');
const {
	// Person,
	getAllPersons,
	getPersonById,
	addPerson,
	deletePerson,
	updatePerson,
} = require('./mongo');
const app = express();

const currentDateTime = new Date().toString();
// function getRandomId() {
// 	const id = Math.floor(Math.random() * 1000).toString();
// 	return id;
// }

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(requestLogger);

app.get('/', (request, response) => {
	response.send('<h1>Welcome to phonebook backend.</h1>');
});

app.get('/info', async (request, response) => {
	const persons = await getAllPersons();
	response.send(`
		<p>Phonebook has info for ${persons.length} people.</p>
		<p>${currentDateTime}</p>
		`);
});

app.get('/api/persons', async (request, response) => {
	const persons = await getAllPersons();
	response.json(persons);
});

app.get('/api/persons/:id', async (request, response, next) => {
	try {
		const id = request.params.id;
		const person = await getPersonById(id);
		if (person) {
			response.json(person);
		} else {
			response.status(404).end();
		}
	} catch (error) {
		next(error);
	}
});

app.put('/api/persons/:id', async (request, response, next) => {
	try {
		const id = request.params.id;
		const { name, number } = request.body;
		await updatePerson(id, name, number);
		response.status(200).end();
	} catch (error) {
		next(error);
	}
});

app.post('/api/persons', async (request, response, next) => {
	try {
		const { name, number } = request.body;

		if (!name || !number) {
			return response.status(400).json({
				error: 'Provided information is incomplete',
			});
		}

		const result = await addPerson(name, number);
		response.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	deletePerson(id);
	response.status(204).end();
});

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
