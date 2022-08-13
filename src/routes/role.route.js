const { Router } = require("express");
const role = require('../schemas/role.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;

const GenericController = require('../controllers/generic.Controller.js');
const validationFunction = require('../utils/functions.js').idValidation;
const Service = require('../service/genericService.js');

const roleService = new Service('role',validationFunction,
								['permission'],['PermissionId']);
const controller = new GenericController(roleService);
const config = (models) =>{
	const permission = models['permission'];
	return {
		include: [permission],
		attributes: ['id', 'name'],
	}
};

const roleRouters = Router();

roleRouters.get("/",validationBody(paginate), controller.pagination(config));
roleRouters.get("/:id",validationParam(id), controller.getOne(config));
roleRouters.post("/", validationBody(role), controller.create());
roleRouters.put("/:id", validationParam(id), validationBody(role), controller.update());
roleRouters.delete("/:id", validationParam(id), controller.remove());

printEndpoints(roleRouters,true,'/role');

module.exports = roleRouters;
