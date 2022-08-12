const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = require('../../config/config.js').JWT_SECRET_KEY;
require('express-async-errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new CustomError('Token missing.', 401);
  }
  try{
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    next();
  }catch(err){      
    throw new CustomError('Internal server error.', 500);
  }
}
