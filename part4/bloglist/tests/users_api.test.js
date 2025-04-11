const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
	{
		username: 'DemianV',
		name: 'DemianV',
		blogs: [],
		id: '67f947e61491a735492f739e',
	},
];

test('user uploads', async () => {
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

test('username < 3 characters does not get uploaded to db', async () => {
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

test('password < 3 characters does not get uploaded to db', async () => {
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
	let userObject1 = new User(initialUsers[1]);
	await userObject.save();
	await userObject1.save();
});

after(async () => {
	await mongoose.connection.close();
});
