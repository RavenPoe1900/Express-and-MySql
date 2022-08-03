const {
	create,
	remove,
	getOne,
	pagination,
	update,
} = require("../controllers/breed.controller");
const { Router } = require("express");
const breed = require('../schemas/breed.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;


const breedRouters = Router();

breedRouters.get("/",validationBody(paginate), pagination);
// breedRouters.get("/", purchase);

breedRouters.get("/:id",validationParam(id), getOne);
breedRouters.post("/", validationBody(breed), create);
breedRouters.put("/:id", validationParam(id), validationBody(breed), update);
breedRouters.delete("/:id", validationParam(id), remove);

// breedRouters.get("/purchase/", purchase);


printEndpoints(breedRouters,true,'/breed');

module.exports = breedRouters;
