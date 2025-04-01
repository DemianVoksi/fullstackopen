require('dotenv').config();

let PORT = process.env.PORT;
let MONGO_URL = process.env.MONGO_URL;
const databaseName =
	process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
		? 'fullstackopentest'
		: 'fullstackopen';

module.exports = {
	MONGO_URL,
	PORT,
	databaseName,
};
