const { Router } = require("express");
const shop = require('../schemas/shop.schema.js'); 
const id = require('../schemas/id.schema.js'); 
const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const GenericController = require('../controllers/generic.Controller.js');
const Service = require('../service/genericService.js');

const shopService = new Service('shop', (params)=>{return false;})
const controller = new GenericController(shopService);

const printEndpoints = require('../utils/logger.js').printEndpoints;


const shopRouters = Router();

shopRouters.get("/",validationBody(paginate), controller.pagination());
shopRouters.get("/:id",validationParam(id), controller.getOne());
shopRouters.post("/", validationBody(shop), controller.create());
shopRouters.put("/:id", validationParam(id), validationBody(shop), controller.update());
shopRouters.delete("/:id", validationParam(id), controller.remove());

printEndpoints(shopRouters,true,'/shop');

module.exports = shopRouters;
