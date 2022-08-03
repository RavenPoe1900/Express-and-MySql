const Joi = require('joi'); 
const stringNumber = require('./stringNumber.schema.js');

module.exports =Joi.object().keys({id: stringNumber,});