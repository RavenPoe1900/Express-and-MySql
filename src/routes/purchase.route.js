const {	purchase } = require("../controllers/purchase.controller");
const { Router } = require("express");
const purchaseSchema = require('../schemas/purchase.schema.js'); 

const jwtExtractor = require('../middlewares/jwtExtractorAndRefresh.middleware.js');
const jwtBlackList = require('../middlewares/jwtBlackList.middleware.js');


const validationBody = require('../middlewares/validationBody.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;


const purchaseRouters = Router();

purchaseRouters.get("/",jwtBlackList, jwtExtractor, validationBody(purchaseSchema), purchase);
// Remove, Update, GetOne and Paginate

printEndpoints(purchaseRouters,true,'/purchase');

module.exports = purchaseRouters;
