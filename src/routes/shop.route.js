const {
	create,
	remove,
	getOne,
	pagination,
	update,
} = require("../controllers/shop.controller");
const { Router } = require("express");
const shop = require('../schemas/shop.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;


const shopRouters = Router();

shopRouters.get("/",validationBody(paginate), pagination);
shopRouters.get("/:id",validationParam(id), getOne);
shopRouters.post("/", validationBody(shop), create);
shopRouters.put("/:id", validationParam(id), validationBody(shop), update);
shopRouters.delete("/:id", validationParam(id), remove);

printEndpoints(shopRouters,true,'/shop');

module.exports = shopRouters;
