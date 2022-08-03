const {
	register,
	logout,
} = require("../controllers/auth.controller");
const { Router } = require("express");
const registerSchema = require('../schemas/register.schema.js'); 
const person = require('../schemas/person.schema.js'); 

// const token = require('../schemas/token.schema.js'); 
// const paginate = require('../schemas/paginate.schema.js'); 

const validationBody = require('../middlewares/validationBody.middleware.js'); 
const validationParam = require('../middlewares/validationParam.middleware.js'); 

const printEndpoints = require('../utils/logger.js').printEndpoints;


const authRouters = Router();

// authRouters.post("/",validationBody(passwordSchema), register);
authRouters.post("/", validationBody(registerSchema), register);

// registerRouters.get("/:token",validationParam(id), logout);

printEndpoints(authRouters,true,'/auht');

module.exports = authRouters;
