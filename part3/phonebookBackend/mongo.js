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
		name: String,
		number: String,
	},
	{ collection: 'people' }
);
const Person = mongoose.model('Person', personSchema);

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
