const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { errorHandler } = require('../utils/middleware');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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
			body.content.likes = 0;
			const blog = new Blog({ content: body.content, user: user._id });
			const resultBlog = await blog.save();

			user.blogs = user.blogs.concat(resultBlog._id);
			await user.save();
			return response.status(201).json(resultBlog);
		} else {
			const blog = new Blog({ content: body.content, user: user._id });
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

blogsRouter.put('/:id', async (request, response, next) => {
	try {
		const id = request.params.id;
		const body = request.body;

		if (!body || !body.content) {
			return response.status(400).json({ error: 'missing content' });
		}

		const updatedFields = {
			content: {
				title: body.content.title,
				author: body.content.author,
				url: body.content.url,
				likes: body.content.likes,
			},
		};

		if (body.user) {
			updatedFields.user = body.user;
		}

		const updatedBlog = await Blog.findByIdAndUpdate(id, updatedFields, {
			new: true,
			runValidators: true,
		}).populate('user', { username: 1, name: 1 });

		if (!updatedBlog) {
			return response.status(404).json({ error: 'blog not found' });
		}

		response.status(200).json(updatedBlog);
		// 	const { title, author, url, likes } = request.body.content;
		// 	const updatedBlog = await Blog.findByIdAndUpdate(
		// 		id,
		// 		{ title, author, url, likes },
		// 		{ new: true, runValidators: true }
		// 	);
		// 	response.status(200).json(updatedBlog).end();
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
		next(error);
	}
});

module.exports = blogsRouter;
