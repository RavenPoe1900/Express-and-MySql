const jwt = require('jsonwebtoken');
const {key, expires} = require('../../config/config.js').JWT;
const {refreshKey} = require('../../config/config.js').REFRESHJWT;
const Service = require('../service/genericService.js');
const personService = new Service('person', (params)=>{return false;});
const {createOrRefreshToken} = require('../utils/functions.js');
require('express-async-errors');

module.exports = async (req, res, next) => {
  let token = req.cookies.jwt;
  try{
    let decodedToken = jwt.verify(token, key);
    next();
  }catch(err){  
    if(err.message === 'jwt expired'){
      const payload = jwt.verify(token, key, {ignoreExpiration: true} );
      const person = await personService.getOne(req.app.locals.models, payload.userId);
      if(person.error) throw new CustomError('Invalid token', 401);
      try{
        decodedToken = jwt.verify(person.refreshToken, refreshKey);
        token = createOrRefreshToken(payload.userId, payload.userName, key, expires);
        res.cookie('jwt', token, { httpOnly: true, secure: false });
        return next();
      }catch(err){
        throw new CustomError('Invalid token.', 401);
      }
    }
    throw new CustomError('Invalid token.', 401);
  }
}
