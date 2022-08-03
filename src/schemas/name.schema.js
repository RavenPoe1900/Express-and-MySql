const Joi = require('joi'); 

module.exports = Joi.string().min(3).max(30).required();