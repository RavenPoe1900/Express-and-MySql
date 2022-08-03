const genericController = require('../utils/genericController.js');
const service = require('../utils/genericService.js');

const breedService = new service('breed', (params)=>{return false;});
const controller = new genericController(breedService);


const pagination = (req, res) => {
	return controller.pagination(req,res,{});	
};

const getOne = (req, res) => {
    return controller.getOne(req, res,{});	 
};

const create =  (req, res) => {
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