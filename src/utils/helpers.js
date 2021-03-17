const EventEmitter = require('events');
const ee = new EventEmitter();
ee.on('log', (...args) => console.log(`${new Date().toLocaleDateString('pt-br')} ${new Date().toLocaleTimeString('pt-br')} --`, args.join(', ')));
const addHeaders = (res, statusCode) => res.writeHead(statusCode, { 'Content-Type': 'application/json' });
module.exports.error = (res, error = 'Unknown error occurred', statusCode = 500) => {
	ee.emit('log', 'Entered error helper', error);
	addHeaders(res, statusCode);
	res.end(JSON.stringify({ status: 'fail', error }, null, 3));
}
module.exports.success = (res, data = null) => {
	addHeaders(res, 200);
	res.end(JSON.stringify({ status: 'success', data }, null, 3));
}
module.exports.log = (...args) => ee.emit('log', args);
module.exports.nextSerial = (collection = []) => (Math.max.apply(Math, collection.map(item => item._id)) || 0) + 1;
module.exports.writeFile = (path, content, charset = 'utf8') => fs.writeFile(path, content, charset, error => error);
