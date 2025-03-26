const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { argv } = require('node:process');

dotenv.config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
	dbName: 'fullstackopen',
});

const password = process.argv[2];
const personSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			minLength: 3,
			required: true,
		},
		number: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return /^([0-9]{2,3})-([0-9]{7,8})$/.test(v);
				},
				message: (props) =>
					`${props.value} is not a valid phone number! Format should be XX-XXXXXXX or XXX-XXXXXXXX`,
			},
		},
	},
	{ collection: 'people' }
);
const Person = mongoose.model('Person', personSchema);

async function getAllPersons() {
	const persons = await Person.find({});
	return persons;
}

async function getPersonById(id) {
	const person = await Person.findById(id);
	return person;
}

async function addPerson(name, number) {
	const person = new Person({
		name,
		number,
	});
	return await person.save();
}

async function updatePerson(id, name, number) {
	try {
		const updatedPerson = await Person.findByIdAndUpdate(
			id,
			{ name, number },
			{ new: true, runValidators: true }
		);
		return updatedPerson;
	} catch (error) {
		throw error;
	}
}

async function deletePerson(id) {
	const result = await Person.findByIdAndDelete(id);
	return result;
}

if (argv.length === 5) {
	const newPerson = new Person({
		name: argv[3],
		number: argv[4],
	});
	newPerson.save().then((result) => {
		mongoose.connection.close();
	});
	console.log(`added ${argv[3]} number ${argv[4]} to phonebook`);
} else if (argv.length === 3) {
	Person.find({}).then((result) => {
		console.log('phonebook:');
		result.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
			mongoose.connection.close();
		});
	});
}

module.exports = {
	Person,
	getAllPersons,
	getPersonById,
	deletePerson,
	addPerson,
	updatePerson,
};
