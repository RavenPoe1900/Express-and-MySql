const {
	create,
	remove,
	getOne,
	pagination,
	update,
	imageUpload,
	imageDownload,
} = require("../controllers/person.controller.js");
const { Router } = require("express");
const person = require('../schemas/person.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 
const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 
const printEndpoints = require('../utils/logger.js').printEndpoints;
const upload = require('../utils/multerMemory.js');


const personRouters = Router();

personRouters.get("/",validationBody(paginate), pagination);
personRouters.get("/:id",validationParam(id), getOne);
personRouters.post("/", validationBody(person), create);
personRouters.put("/:id", validationParam(id), validationBody(person), update);
personRouters.delete("/:id", validationParam(id), remove);
personRouters.get("/image/:id",validationParam(id),imageDownload);
personRouters.post("/image/:id",upload,imageUpload);

printEndpoints(personRouters,true,'/person');

module.exports = personRouters;
