require('dotenv').config();
const http = require('http');
const helpers = require('./utils/helpers');
process.on('uncaughtException', err => helpers.log('Uncaught exception has been detected', err));
process.on('unhandledRejection', err => helpers.log('Unhandled exception has been detected', err));
const server = http.createServer(async (req, res) => {
	await require('./core/handler')(req, res, require('./core/routes')); 
});
server.listen(process.env.PORT, () => helpers.log(`Localhost listening to port ${process.env.PORT}`));
