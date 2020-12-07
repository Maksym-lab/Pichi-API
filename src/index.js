require('dotenv').config();
const http = require('http');
const EventEmitter = require('events');
const ee = new EventEmitter();
ee.on('log', (message) => console.log(`${new Date().toLocaleDateString('pt-br')} ${new Date().toLocaleTimeString('pt-br')} - ${message}`));
const server = http.createServer(async (req, res) => {
	ee.emit('log', 'Entered server, everything is OK.');
	const data = `<div>Welcome, server is running at port ${process.env.PORT}</div>`;
	res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
  res.write(data);
  res.end();
});
server.listen(process.env.PORT, () => console.log(`Localhost listening to port ${process.env.PORT}`));
