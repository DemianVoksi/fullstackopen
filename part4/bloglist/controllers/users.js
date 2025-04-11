const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const { errorHandler } = require('../utils/middleware');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {
		title: 1,
		author: 1,
		url: 1,
		likes: 1,
	});
	response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
	try {
		const user = new User({
			name: request.body.name,
			username: request.body.username,
		});

		if (request.body.password.length < 3) {
			console.error('Password not long enough');
			return response.status(400).end();
		} else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(request.body.password, salt);
			user.set('password', hash);
			await user.save();
			return response.status(201).json(user);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = usersRouter;
