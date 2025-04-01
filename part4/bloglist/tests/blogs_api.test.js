const { test, after } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');

const api = supertest(app);

test('notes are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test.only('there are three blogs', async () => {
	const response = await api.get('/api/blogs');

	assert.strictEqual(response.body.length, 3);
});

test('the first note is about HTTP methods', async () => {
	const response = await api.get('/api/blogs');

	const title = response.body.map((e) => e.title);
	assert.strictEqual(title.includes('HTML is easy'), true);
});

after(async () => {
	await mongoose.connection.close();
});
