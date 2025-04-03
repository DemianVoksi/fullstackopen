const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { errorHandler } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
	try {
		if (request.body.likes) {
			const blog = new Blog(request.body);
			const result = await blog.save();
			response.status(201).json(result);
		} else {
			let blog = new Blog(request.body);
			blog.likes = 0;
			const result = await blog.save();
			response.status(201).json(result);
		}
	} catch (error) {
		errorHandler(error, request, response, next);
	}
});

module.exports = blogsRouter;
