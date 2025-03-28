const rootRouter = require('express').Router();

rootRouter.get('/', (request, response) => {
	response.send('<h1>blog list homepage</h1>');
});

module.exports = rootRouter;
