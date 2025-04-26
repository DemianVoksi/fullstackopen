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
			title: 'HTML is easy',
			author: 'Michael Chan',
			user: '67f947e61491a735492f739e',
			url: 'https://reactpatterns.com/',
			likes: 7,
		},
		_id: '5a422a851b54a676234d17f7',
		__v: 0,
	},
	{
		content: {
			title: 'React patterns 2',
			author: 'Cichael Mhan',
			user: '67f947e61491a735492f739e',
			url: 'https://reactpatterns.com/',
			likes: 10,
		},
		_id: '5a422a851b54a676234d27f7',
		__v: 0,
	},
	{
		content: {
			title: 'React patterns 3',
			author: 'Yyoyo Yoyo',
			user: '67f947e61491a735492f739e',
			url: 'https://reactpatterns.com/',
			likes: 11,
		},
		_id: '5a422a851b54a676234d37f7',
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

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

// test('there are three blogs', async () => {
// 	const response = await api.get('/api/blogs');

// 	assert.strictEqual(response.body.length, 3);
// });

// test('the first note is about HTTP methods', async () => {
// 	const response = await api.get('/api/blogs');

// 	const title = response.body.map((e) => e.title);
// 	assert.strictEqual(title.includes('HTML is easy'), true);
// });

test('has unique identifier', async () => {
	const response = await api.get('/api/blogs');
	const keys = await response.body.map((blog) => Object.keys(blog));
	keys.forEach((k) => {
		assert.strictEqual(k.includes('id'), true);
	});
});

test('api POST works', async () => {
	const newBlog = {
		content: {
			title: 'Some more tests',
			author: 'Robert Lobert',
			url: 'http://example.com',
			likes: 11,
		},
		user: initialUsers[0]._id,
		_id: '6a422b891b54a696234d17fb',
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

test.only('no likes submitted', async () => {
	const newBlog = {
		content: {
			title: 'Likes 0',
			author: 'Robert Lobert',
			url: 'http://example.com',
		},
		user: initialUsers[0]._id,
		_id: '6a422b891b54a696234d17fb',
		__v: 0,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body[response.body.length - 1].content.likes, 0);
});

test.only('no url/title response is 400', async () => {
	const newBlog = {
		content: {
			author: 'Robert Lobert',
		},
		user: initialUsers[0]._id,
		_id: '6a422b891b54a696234d17fb',
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

test.only('update works', async () => {
	const id = initialBlogs[0]._id;
	const newBlog = {
		content: {
			title: 'Updated',
			author: 'Robert Lobert',
			url: 'http://example.com',
			likes: 120,
		},
		user: initialUsers[0]._id,
	};

	const request = await api
		.put(`/api/blogs/${id}`)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);
	const response = await api.get('/api/blogs');
	assert.strictEqual(response.body[0].content.likes, 120);
});

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	const user = new User(initialUsers[0]);
	const savedUser = await user.save();

	for (let blog of initialBlogs) {
		const blogObject = new Blog({
			content: blog.content,
			user: savedUser._id,
			_id: blog._id,
		});
		const savedBlog = await blogObject.save();
		savedUser.blogs = savedUser.blogs.concat(savedBlog._id);
	}
	await savedUser.save();
});

after(async () => {
	await mongoose.connection.close();
});
