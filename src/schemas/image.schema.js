const Joi = require('joi'); 
const stringNumber = require('./stringNumber.schema.js');

module.exports =Joi.object().keys({
    name: stringNumber,
    format: Joi.valid('jpg','jpeg','png').required(),
    mimeType: Joi.valid('image').required(),
});