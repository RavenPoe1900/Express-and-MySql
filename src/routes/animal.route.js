const {
	create,
	remove,
	getOne,
	pagination,
	update,
} = require("../controllers/animal.controller");
const { Router } = require("express");
const animal = require('../schemas/animal.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;

const animalRouters = Router();

animalRouters.get("/",validationBody(paginate), pagination);
animalRouters.get("/:id",validationParam(id), getOne);
animalRouters.post("/", validationBody(animal), create);
animalRouters.put("/:id", validationParam(id), validationBody(animal), update);
animalRouters.delete("/:id", validationParam(id), remove);

printEndpoints(animalRouters,true,'/animal');

module.exports = animalRouters;
