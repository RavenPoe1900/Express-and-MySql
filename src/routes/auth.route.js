const {
	login,
	logout,
} = require("../controllers/auth.controller");
const { Router } = require("express");
const registerSchema = require('../schemas/register.schema.js'); 
const validationBody = require('../middlewares/validationBody.middleware.js'); 
const jwtExtractor = require('../middlewares/jwtExtractorAndRefresh.middleware.js');
const jwtBlackList = require('../middlewares/jwtBlackList.middleware.js');
const printEndpoints = require('../utils/logger.js').printEndpoints;


const authRouters = Router();

authRouters.post("/", validationBody(registerSchema), login);

authRouters.delete("/",jwtBlackList, jwtExtractor, logout);

printEndpoints(authRouters,true,'/auht');

module.exports = authRouters;
