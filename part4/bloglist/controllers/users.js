const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const { errorHandler } = require('../utils/middleware');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
	try {
		const user = new User({
			name: request.body.name,
			username: request.body.username,
		});

		bcrypt.hash(request.body.password, 10, async (error, hashedPassword) => {
			if (error) {
				return next(error);
			}
			user.set('password', hashedPassword);
			await user.save();
			return response.status(201).json(user);
		});
	} catch (error) {
		errorHandler(error);
	}
});

module.exports = usersRouter;
