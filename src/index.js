require('dotenv').config();
const http = require('http');
const EventEmitter = require('events');
const helpers = require('./utils/helpers');
const ee = new EventEmitter();
ee.on('log', (...args) => console.log(`${new Date().toLocaleDateString('pt-br')} ${new Date().toLocaleTimeString('pt-br')}`, args));
process.on('uncaughtException', err => ee.emit('log', 'Uncaught exception has been detected', err));
process.on('unhandledRejection', err => ee.emit('log', 'Unhandled exception has been detected', err));
const server = http.createServer(async (req, res) => {
	await require('./core/handler')(req, res, require('./core/routes')); 
});
server.listen(process.env.PORT, () => ee.emit('log', `Localhost listening to port ${process.env.PORT}`));
