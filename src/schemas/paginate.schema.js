const Joi = require('joi'); 

module.exports =Joi.object().keys({
    page: Joi.number().integer().min(1).required().strict(),
    size: Joi.number().integer().min(1).max(250).required().strict(),
});