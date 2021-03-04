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
  },
	{
		method: 'POST',
		path: '/customers',
		handler: customersController.new.bind(customersController)
	},
	{
		method: 'PUT',
		path: '/customers',
		handler: customersController.edit.bind(customersController)
	},
	{
		method: 'DELETE',
		path: /\/customers\/([0-9a-z]+)/,
		handler: customersController.remove.bind(customersController)
	}
]
module.exports = routes;
