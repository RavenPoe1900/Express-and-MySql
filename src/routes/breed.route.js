const { Router } = require("express");
const breed = require('../schemas/breed.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;

const GenericController = require('../controllers/generic.Controller.js');
const Service = require('../service/genericService.js');

const breedService = new Service('breed', (params)=>{return false;});
const controller = new GenericController(breedService);


const breedRouters = Router();

breedRouters.get("/",validationBody(paginate), controller.pagination());
breedRouters.get("/:id",validationParam(id), controller.getOne());
breedRouters.post("/", validationBody(breed), controller.create());
breedRouters.put("/:id", validationParam(id), validationBody(breed), controller.update());
breedRouters.delete("/:id", validationParam(id), controller.remove());


printEndpoints(breedRouters,true,'/breed');

module.exports = breedRouters;
