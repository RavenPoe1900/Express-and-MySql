const Joi = require('joi'); 
const joiName = require('./name.schema.js');

module.exports = Joi.object().keys({name: joiName,}) ;

