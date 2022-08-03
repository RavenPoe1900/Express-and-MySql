const PersonController = require('./utils/personController.js');
const hashPassword = require('../utils/functions.js').hashPassword;
const Service = require('../service/personService.js');

const personService = new Service('person', (params)=>{return false;});
const controller = new PersonController(personService);


const pagination = (req, res) => {
	return controller.pagination(req,res,{});	
};

const getOne = (req, res) => {
    return controller.getOne(req, res,{});	 
};

const create = async (req, res) => {
	req.body.password = await hashPassword(req.body.password);
    return controller.create(req, res);
};

const update = async (req, res) => {
	req.body.password = await hashPassword(req.body.password);
	return controller.update(req, res);
};

const remove = (req, res) => {
    return controller.remove(req, res);
};

const imageUpload = async (req, res)=>{
	return controller.imageUpload(req, res);
}

const imageDownload = async (req, res) => {
    return controller.imageDownload(req, res);
};

module.exports = {
	pagination,
	getOne,
	create,
	update,
	remove,
	imageUpload,
	imageDownload,
};