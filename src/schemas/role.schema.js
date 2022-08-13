const joi = require('joi'); 
const joiName = require('./name.schema.js');
const joiInteger = require('./integer.schema.js');


module.exports = joi.object().keys({
    name: joiName,
    PermissionId: joiInteger,
}) ;