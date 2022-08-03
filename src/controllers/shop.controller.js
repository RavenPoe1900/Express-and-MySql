const GenericController = require('./utils/genericController.js');
const Service = require('../service/genericService.js');

const shopService = new Service('shop', (params)=>{return false;})
const controller = new GenericController(shopService);


const pagination = (req, res) => {
	return controller.pagination(req,res,{});	
};

const getOne = (req, res) => {
    return controller.getOne(req, res,{});	 
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