const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
	{
		username: 'njjjjjjo',
		name: 'njjjjjjo',
		blogs: [],
		password: '$2b$10$JIWhZCCGCmbGY9mU.9MbFudtqYUe2pWHLXvEWK625.zwLFutXJf5e',
		_v: 0,
		_id: '67f53088e324a91aa63a1105',
	},
];

test.only('user uploads', async () => {
	const testUser = {
		username: 'yes',
		name: 'yes',
		password: 'shouldwork',
		blogs: [],
	};

	const request = await api
		.post('/api/users')
		.send(testUser)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const usersAtEnd = await User.find({});
	assert.strictEqual(usersAtEnd.length, 2);
});

test.only('username < 3 characters does not get uploaded to db', async () => {
	const testUser = {
		username: 'no',
		name: 'no',
		password: 'shouldnotwork',
		blogs: [],
	};

	const request = await api
		.post('/api/users')
		.send(testUser)
		.expect(400)
		.expect('Content-Type', /application\/json/);

	const usersAtEnd = await User.find({});
	assert.strictEqual(usersAtEnd.length, 1);
});

test.only('password < 3 characters does not get uploaded to db', async () => {
	const testUser = {
		username: 'yes',
		name: 'yes',
		password: 'no',
		blogs: [],
	};

	const request = await api.post('/api/users').send(testUser).expect(400);
	const usersAtEnd = await User.find({});
	assert.strictEqual(usersAtEnd.length, 1);
});

beforeEach(async () => {
	await User.deleteMany({});
	let userObject = new User(initialUsers[0]);
	await userObject.save();
});

after(async () => {
	await mongoose.connection.close();
});
