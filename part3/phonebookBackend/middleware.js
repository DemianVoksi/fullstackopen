const morgan = require('morgan');

morgan.token('postData', (request) => {
	if (request.method === 'POST') {
		return JSON.stringify(request.body);
	}
	return '';
});

const requestLogger = morgan(
	':method :url :status :res[content-length] - :response-time ms :postData'
);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.message === 'CastError') {
		return response.status(400).send({ error: 'malformed id' });
	}
	if (error.message === 'ValidationError') {
		return response.status(400).sned({ error: error.message });
	}

	next(error);
};

module.exports = {
	requestLogger,
	errorHandler,
};
