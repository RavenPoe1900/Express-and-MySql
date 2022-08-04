const { Router } = require("express");
const pet = require('../schemas/pet.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;

const GenericController = require('../controllers/generic.Controller.js');
const validationFunction = require('../utils/functions.js').idValidation;
const Service = require('../service/genericService.js');

const petService = new Service('pet',validationFunction,
								['breed','person'],['BreedId','OwnerId']);
const controller = new GenericController(petService);
const config = (models) =>{
	const person = models['person'];
	const breed = models['breed'];
	return {
		include: [{ model: person, as: "Owner" }, breed],
		attributes: ['id', 'name'],
	}
};

const petRouters = Router();

petRouters.get("/",validationBody(paginate), controller.pagination(config));
petRouters.get("/:id",validationParam(id), controller.getOne(config));
petRouters.post("/", validationBody(pet), controller.create());
petRouters.put("/:id", validationParam(id), validationBody(pet), controller.update());
petRouters.delete("/:id", validationParam(id), controller.remove());

printEndpoints(petRouters,true,'/pet');

module.exports = petRouters;
