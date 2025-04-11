const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const assert = require('node:assert');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const initialBlogs = [
	{
		content: {
			title: 'React patterns',
			author: 'Michael Chan',
			user: '67f947e61491a735492f739e',
			url: 'https://reactpatterns.com/',
			likes: 7,
		},
		_id: '5a422a851b54a676234d17f7',
		__v: 0,
	},
];

const initialUsers = [
	{
		username: 'DemianV',
		name: 'DemianV',
		password: 'whiqdewni',
		blogs: [],
		_id: '67f947e61491a735492f739e',
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

test.only('has unique identifier', async () => {
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

test('delete works', async () => {
	const id = initialBlogs[0]._id;
	const request = await api.delete(`/api/blogs/${id}`).expect(204);
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body.length, initialBlogs.length - 1);
});

test('update works', async () => {
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
	await User.deleteMany({});

	const user = new User(initialUsers[0]);
	const savedUser = await user.save();

	// Create blogs with user reference
	for (let blog of initialBlogs) {
		const blogObject = new Blog({
			...blog,
			user: savedUser._id,
		});
		const savedBlog = await blogObject.save();
		savedUser.blogs = savedUser.blogs.concat(savedBlog._id);
	}
	await savedUser.save();
});

after(async () => {
	await mongoose.connection.close();
});
