const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { errorHandler } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
	try {
		if (!request.body.title || !request.body.url) {
			return response.status(400).json({ error: 'bad request' });
		}
		if (!request.body.likes) {
			let blog = new Blog(request.body);
			blog.likes = 0;
			const result = await blog.save();
			return response.status(201).json(result);
		} else {
			const blog = new Blog(request.body);
			const result = await blog.save();
			return response.status(201).json(result);
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
