const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { errorHandler } = require('../utils/middleware');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	return response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
	let body = request.body;
	const user = await User.findById(body.user);

	try {
		if (!body.content.title || !body.content.url) {
			return response.status(400).json({ error: 'bad request' });
		}
		if (!body.content.likes) {
			body.likes = 0;
			const blog = new Blog({ content: body.content, user: user.id });
			const resultBlog = await blog.save();

			user.notes = user.notes.concat(resultBlog._id);
			await user.save();
			return response.status(201).json(resultBlog);
		} else {
			const blog = new Blog({ content: body.content, user: user.id });
			const savedBlog = await blog.save();
			user.blogs = user.blogs.concat(savedBlog._id);
			await user.save();

			const populatedBlog = await Blog.findById(savedBlog._id).populate(
				'user',
				{ username: 1, name: 1 }
			);
			response.status(201).json(populatedBlog);
		}
	} catch (error) {
		errorHandler(error, request, response, next);
	}
});

blogsRouter.put('/:id', async (request, response) => {
	try {
		const id = request.params.id;
		const { title, author, url, likes } = request.body;
		const updatedBlog = await Blog.findByIdAndUpdate(
			id,
			{ title, author, url, likes },
			{ new: true, runValidators: true }
		);
		response.status(200).json(updatedBlog).end();
	} catch (error) {
		errorHandler(error);
	}
});

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const id = request.params.id;
		const result = await Blog.findByIdAndDelete(id);
		return response.status(204).end();
	} catch (error) {
		errorHandler(error);
	}
});

module.exports = blogsRouter;
