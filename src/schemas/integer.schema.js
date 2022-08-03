const joi = require('joi'); 

module.exports =joi.number().integer().positive().strict().required();