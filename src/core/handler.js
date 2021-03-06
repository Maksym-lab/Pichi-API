const { parse } = require('querystring');
const helpers = require('../utils/helpers');
module.exports = async (req, res, routes) => {
	if (req.url === '/' && req.method === 'GET') {
		const data = `<div>Welcome, server is running at port ${process.env.PORT}</div>`;
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
		res.write(data);
		res.end();
	} else {
		const route = routes.find(route => {
			const methodMatch = route.method === req.method;
			let pathMatch = false;
			if (typeof route.path === 'object') pathMatch = req.url.match(route.path);
			else pathMatch = route.path === req.url;
			return pathMatch && methodMatch;
		});
		let param = null;
		if (route && typeof route.path === 'object') param = req.url.match(route.path)[1];
		if (route) {
			let body = null;
			if (
				req.method === 'POST' ||
				req.method === 'PUT'
			) body = await getPostData(req).catch((err) => helpers.error(res, 'Invalid body has been sent.', 500));
			return route.handler(req, res, param, body);
		} else return helpers.error(res, ' Endpoint not found', 404);
	}
}
const getPostData = (req) => {
	return new Promise((resolve, reject) => {
		try {
			let body = '';
			req.on('data', chunk => body += chunk.toString());
			req.on('end', () => resolve(JSON.parse(body)));
		} catch (e) {
			reject(e);
		}
	});
}
