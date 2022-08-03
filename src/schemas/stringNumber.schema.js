const Joi = require('joi'); 

module.exports = Joi.string().pattern(/^[0-9]+$/).required();