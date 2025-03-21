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

module.exports = {
	requestLogger,
};
