const customers = require('../data/mock.json');
const helpers = require('../utils/helpers');
class customersController {
	async index (req, res) {
		try {
			console.log(customers)
			return helpers.success(res, customers);
    } catch (error) {
      return helpers.error(res, error);
		}
	}
  async show (req, res, param) {
		try {
      const customer = await customers.filter(x => x.id === param.id)[0];
      return helpers.success(res, customer);
	  } catch (error) {
      return helpers.error(res, error);
	  }
	}
}
module.exports = new customersController();
