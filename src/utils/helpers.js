const addHeaders = res => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS, TRACE, PATCH');
	res.setHeader('Content-Type', 'application/json');
}
module.exports.error = (res, error = 'Unknown error occurred', statusCode = 500) => {
	addHeaders(res);
	res.statusCode = statusCode;
	res.end(JSON.stringify({ status: 'fail', error }, null, 3))
}
module.exports.success = (res, data = null) => {
	addHeaders(res);
	res.statusCode = 200;
	res.end(JSON.stringify({ status: 'success', data }, null, 3));
}
