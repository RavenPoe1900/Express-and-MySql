const GenericController = require('./utils/genericController.js');
const validationFunction = require('../utils/functions.js').idValidation;
const Service = require('../service/genericService.js')

const animalService = new Service('animal',validationFunction,	
								['breed','shop'],['BreedId','ShopId']);
const controller = new GenericController(animalService);

const config = (req) =>{
	const shop = req.app.locals.models['shop'];
	const breed = req.app.locals.models['breed'];
	return {
		include: [shop, breed],
		attributes: ['price', 'amount', 'id'],
	}
};

const pagination = (req, res) => {
	return controller.pagination(req, res, config(req));	
};

const getOne = (req, res) => {
    return controller.getOne(req, res, config(req));	 
};

const create = (req, res) => {
    return controller.create(req, res);
};

const update = (req, res) => {
	return controller.update(req, res);
};

const remove = (req, res) => {
    return controller.remove(req, res);
};

module.exports = {
	pagination,
	getOne,
	create,
	update,
	remove,
};