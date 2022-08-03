const GenericController = require('./utils/genericController.js');
const validationFunction = require('../utils/functions.js').idValidation;
const Service = require('../service/genericService.js');

const petService = new Service('pet',validationFunction,
								['breed','person'],['BreedId','OwnerId']);
const controller = new GenericController(petService);							

const config = (req) =>{
	const person = req.app.locals.models['person'];
	const breed = req.app.locals.models['breed'];
	return {
		include: [{ model: person, as: "Owner" }, breed],
		attributes: ['id', 'name'],
	}
};

const pagination = (req, res) => {
	return controller.pagination(req,res, config(req));	
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