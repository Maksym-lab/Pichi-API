const customersController = require('../controllers/customersController');
const routes = [
	{
		method: 'GET',
		path: '/customers',
		handler: customersController.index.bind(customersController)
	},
	{
    method: 'GET',
    path: /\/customers\/([0-9a-z]+)/,
    handler: customersController.show.bind(customersController)
  }
]
module.exports = routes;
