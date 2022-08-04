const { Router } = require("express");
const animal = require('../schemas/animal.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const GenericController = require('../controllers/generic.Controller.js');
const validationFunction = require('../utils/functions.js').idValidation;
const Service = require('../service/genericService.js')

const animalService = new Service('animal',validationFunction,	
								['breed','shop'],['BreedId','ShopId']);
const controller = new GenericController(animalService);

const config = (models) =>{
	const shop = models['shop'];
	const breed = models['breed'];
	return {
		include: [shop, breed],
		attributes: ['price', 'amount', 'id'],
	}
};

const printEndpoints = require('../utils/logger.js').printEndpoints;

const animalRouters = Router();

animalRouters.get("/",validationBody(paginate), controller.pagination(config));
animalRouters.get("/:id",validationParam(id), controller.getOne(config));
animalRouters.post("/", validationBody(animal), controller.create());
animalRouters.put("/:id", validationParam(id), validationBody(animal), controller.update());
animalRouters.delete("/:id", validationParam(id), controller.remove());

printEndpoints(animalRouters,true,'/animal');

module.exports = animalRouters;
