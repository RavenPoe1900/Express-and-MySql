const { Router } = require("express");
const person = require('../schemas/person.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 
const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 
const reqPasswordHash = require('../middlewares/reqPasswordHash.midleware.js'); 
const printEndpoints = require('../utils/logger.js').printEndpoints;
const upload = require('../utils/multerMemory.js');
const PersonController = require('../controllers/person.Controller.js');
const Service = require('../service/personService.js');
const validationFunction = require('../utils/functions.js').idValidation;

const personService = new Service('person', validationFunction,
								['role'],['RoleId']);
const controller = new PersonController(personService);

const config = (models) =>{
	const role = models['role'];
	const permission = models['permission'];

	return {
		include: [{
			model:role,
			include:[{model:permission}],
			attributes:['id', 'name'],
		}],
		attributes: ['id', 'name'],
	}
};

const personRouters = Router();

personRouters.get("/",validationBody(paginate), controller.pagination(config));
personRouters.get("/:id",validationParam(id), controller.getOne(config));
personRouters.post("/", validationBody(person), reqPasswordHash(), controller.create());
personRouters.put("/:id", validationParam(id), validationBody(person),reqPasswordHash(), controller.update());
personRouters.delete("/:id", validationParam(id), controller.remove());
personRouters.get("/image/:id",validationParam(id),controller.imageDownload());
personRouters.post("/image/:id",upload,controller.imageUpload());

printEndpoints(personRouters,true,'/person');

module.exports = personRouters;
