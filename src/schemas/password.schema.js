const Joi = require('joi'); 
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = new Error(`Password must be strong.
                                        At least one upper case alphabet. 
                                        At least one lower case alphabet. 
                                        At least one digit. 
                                        At least one special character. 
                                        Minimum eight in length`);

module.exports =Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required();
