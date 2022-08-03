const Joi = require('joi'); 
const {validationError} = require('../utils/functions.js');


const validationBody = (schema) => { 
  return (req, res, next) => {
    const {error, body} = schema.validate(req.params);   
    validationError(res, next, error);  
  }
} 

module.exports = validationBody;