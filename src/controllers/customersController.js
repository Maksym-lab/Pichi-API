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
			const { name, country } = body;
			const collection = [...customers, { _id: helpers.nextSerial(customers), name, country }];
			fs.writeFile('./data/database.json', JSON.stringify(collection), 'utf8', (error) => {
				if (error) throw error;
				return helpers.success(res, collection);
			});
		} catch (error) {
			return helpers.error(res, error);
		}
	}
	async edit (req, res, param, body) {
		try {
			if (!body) throw 'Body have not been sent!'; 
			const { _id, name, country } = body;
			const position = customers.findIndex(x => x._id === _id);
			if (!position && position !== 0) throw 'Invalid record has been passed, verify your request body.';
			let collection = customers;
			collection[position] = { _id, name, country };
			fs.writeFile('./data/database.json', JSON.stringify(collection), 'utf8', (error) => {
				if (error) throw error;
				return helpers.success(res, collection);
			});
		} catch (error) {
			return helpers.error(res, error);
		}
	}
	async remove (req, res, param, body) {
		try {
			const position = customers.findIndex(x => x._id === parseInt(param));
			if (position < 0) throw 'Invalid record has been passed, verify your request body.';
			const collection = customers.splice(position, 1); 
			fs.writeFile('./data/database.json', JSON.stringify(customers), 'utf8', (error) => {
				if (error) throw error;
				return helpers.success(res, customers);
			});
		} catch (error) {
			return helpers.error(res, error);
		}
	}
}
module.exports = new customersController();
