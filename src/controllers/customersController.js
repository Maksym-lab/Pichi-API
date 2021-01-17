const fs = require('fs');
const customers = require('../data/database.json'); 
const helpers = require('../utils/helpers');
class customersController {
	async index (req, res) {
		try {
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
	async new (req, res, param, body) {
		try {
			if (!body) throw 'Body have not been sent!'; 
			const { name, country } = JSON.parse(body);
			const collection = [...customers, { _id: helpers.nextSerial(customers), name, country }];
			fs.writeFile('./data/database.json', JSON.stringify(collection), 'utf8', (error) => {
				if (error) throw error;
				return helpers.success(res, collection);
			});
		} catch (error) {
			return helpers.error(res, error);
		}
	}
}
module.exports = new customersController();
