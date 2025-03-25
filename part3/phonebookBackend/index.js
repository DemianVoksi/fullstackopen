const express = require('express');
const cors = require('cors');
const { requestLogger } = require('./middleware');
const {
	Person,
	getAllPersons,
	getPersonById,
	addPerson,
	deletePerson,
} = require('./mongo');
const app = express();

let persons = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
	{
		id: '5',
		name: 'Steven Stephen',
		number: '45-67-1122334',
	},
];

const currentDateTime = new Date().toString();
function getRandomId() {
	const id = Math.floor(Math.random() * 1000).toString();
	return id;
}

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(requestLogger);

app.get('/', (request, response) => {
	response.send('<h1>Welcome to phonebook backend.</h1>');
});

app.get('/info', (request, response) => {
	response.send(`
		<p>Phonebook has info for ${persons.length} people.</p>
		<p>${currentDateTime}</p>
		`);
});

app.get('/api/persons', async (request, response) => {
	const persons = await getAllPersons();
	response.json(persons);
});

app.get('/api/persons/:id', async (request, response) => {
	try {
		const id = request.params.id;
		const person = await getPersonById(id);
		if (person) {
			response.json(person).status(200).end();
		} else {
			response.status(400).json({
				error: 'content missing',
			});
		}
	} catch (error) {
		console.error(error);
	}
});

app.post('/api/persons', async (request, response) => {
	const body = request.body;
	const names = persons.map((person) => person.name);

	if (!body.name || !body.number) {
		response.status(400).json({
			error: 'Provided information is incomplete',
		});
	} else if (names.includes(body.name)) {
		response.status(400).json({
			error: `${body.name} is already in the Phonebook. Name must be unique.`,
		});
	} else {
		const result = await addPerson(body.name, body.number);
		response.json(result);
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	deletePerson(id);
	response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
