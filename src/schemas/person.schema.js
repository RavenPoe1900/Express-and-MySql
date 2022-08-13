const Joi = require('joi'); 
const joiName = require('./name.schema.js');
const joiPassword = require('./password.schema.js');
const joiInteger = require('./integer.schema.js');

module.exports = Joi.object().keys(
    {
        name: joiName,
        userName: joiName,
        password: joiPassword,
        RoleId: joiInteger,
    }) ;
