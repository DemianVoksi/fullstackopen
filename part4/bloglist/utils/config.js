require('dotenv').config();

let PORT = process.env.PORT;
let MONGO_URL = process.env.MONGO_URL;
const databaseName =
	process.env.NODE_ENV === 'test' ? 'fullstackopen' : 'fullstackopentest';

module.exports = {
	MONGO_URL,
	PORT,
	databaseName,
};
