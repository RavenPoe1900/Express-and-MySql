const { Router } = require("express");
const permission = require('../schemas/permission.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;

const GenericController = require('../controllers/generic.Controller.js');
const Service = require('../service/genericService.js');

const permissionService = new Service('permission', (params)=>{return false;});
const controller = new GenericController(permissionService);


const permissionRouters = Router();

permissionRouters.get("/",validationBody(paginate), controller.pagination());
permissionRouters.get("/:id",validationParam(id), controller.getOne());
permissionRouters.post("/", validationBody(permission), controller.create());
permissionRouters.put("/:id", validationParam(id), validationBody(permission), controller.update());
permissionRouters.delete("/:id", validationParam(id), controller.remove());


printEndpoints(permissionRouters,true,'/permission');

module.exports = permissionRouters;
