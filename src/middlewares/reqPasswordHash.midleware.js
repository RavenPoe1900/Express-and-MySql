const hashPassword = require('../utils/functions.js').hashPassword;

const reqPasswordHash = () => { 
  return async (req, res, next) => {
    req.body.password = await hashPassword(req.body.password);
    next();
  }
} 

module.exports = reqPasswordHash;