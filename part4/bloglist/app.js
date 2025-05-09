const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const rootRouter = require('./controllers/root');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const app = express();
mongoose.set('strictQuery', false);
logger.info('connecting to', config.MONGO_URL);

mongoose
	.connect(config.MONGO_URL, { dbName: config.databaseName })
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/', rootRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
