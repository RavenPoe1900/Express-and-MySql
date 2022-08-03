const {
	create,
	remove,
	getOne,
	pagination,
	update,
} = require("../controllers/pet.controller");
const { Router } = require("express");
const pet = require('../schemas/pet.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;

const petRouters = Router();

petRouters.get("/",validationBody(paginate), pagination);
petRouters.get("/:id",validationParam(id), getOne);
petRouters.post("/", validationBody(pet), create);
petRouters.put("/:id", validationParam(id), validationBody(pet), update);
petRouters.delete("/:id", validationParam(id), remove);

printEndpoints(petRouters,true,'/pet');

module.exports = petRouters;
