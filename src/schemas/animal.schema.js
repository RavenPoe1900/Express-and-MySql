const Joi = require('joi'); 
const joiInteger = require('./integer.schema.js');

module.exports = Joi.object().keys(
    {
        ShopId: joiInteger,
        BreedId: joiInteger,
        amount: joiInteger,
        price: Joi.number().strict().required(),
    }) ;

