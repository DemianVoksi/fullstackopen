const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const Blog = require('../models/blog');

const api = supertest(app);
const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
];

test('notes are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('there are three blogs', async () => {
	const response = await api.get('/api/blogs');

	assert.strictEqual(response.body.length, 3);
});

test('the first note is about HTTP methods', async () => {
	const response = await api.get('/api/blogs');

	const title = response.body.map((e) => e.title);
	assert.strictEqual(title.includes('HTML is easy'), true);
});

test('has unique identifier', async () => {
	const response = await api.get('/api/blogs');
	const keys = await response.body.map((blog) => Object.keys(blog));
	keys.forEach((k) => {
		assert.strictEqual(k.includes('id'), true);
	});
});

test('api POST works', async () => {
	const newBlog = {
		_id: '6a422b891b54a696234d17fb',
		title: 'Some more tests',
		author: 'Robert Lobert',
		url: 'http://example.com',
		likes: 11,
		__v: 0,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body.length, initialBlogs.length + 1);
});

test('no likes submitted', async () => {
	const newBlog = {
		_id: '6a422b833b54a696234d17fb',
		title: 'Likes 0',
		author: 'Robert Lobert',
		url: 'http://example.com',
		__v: 0,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body[response.body.length - 1].likes, 0);
});

test('no url/title response is 400', async () => {
	const newBlog = {
		_id: '6a422b833b54a696234d17fb',
		author: 'Robert Lobert',
		likes: 7,
		__v: 0,
	};

	const request = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/);

	assert.strictEqual(request.body.error, 'bad request');
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body.length, initialBlogs.length);
});

test.only('delete works', async () => {
	const id = initialBlogs[0]._id;
	const request = await api.delete(`/api/blogs/${id}`).expect(204);
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body.length, initialBlogs.length - 1);
});

test.only('update works', async () => {
	const id = initialBlogs[0]._id;
	const newBlog = {
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 10,
	};

	const request = await api
		.put(`/api/blogs/${id}`)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body[0].likes, 10);
});

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[2]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[3]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[4]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[5]);
	await blogObject.save();
});

after(async () => {
	await mongoose.connection.close();
});
