const Joi = require('joi'); 
const joiName = require('./name.schema.js');

module.exports = Joi.object().keys({
    name: joiName,
    permissions: Joi.string().min(3).max(500).required(),
}) ;