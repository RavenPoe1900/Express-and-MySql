const jwt = require('jsonwebtoken');
const {key, expires} = require('../../config/config.js').JWT;
const {refreshKey} = require('../../config/config.js').REFRESHJWT;
const Service = require('../service/genericService.js');
const personService = new Service('person', (params)=>{return false;});
const {createOrRefreshToken} = require('../utils/functions.js');

module.exports = async (req, res, next) => {
  let token = req.cookies.jwt;
  try{
    let decodedToken = jwt.verify(token, key);
    next();
  }catch(err){  
    if(err.message === 'jwt expired'){
      const payload = jwt.verify(token, key, {ignoreExpiration: true} );
      const person = await personService.getOne(req.app.locals.models, payload.userId);
      if(person.error) return res.status(401).json({ error: 'Invalid token' });
      try{
        decodedToken = jwt.verify(person.refreshToken, refreshKey);
        token = createOrRefreshToken(payload.userId, payload.userName, key, expires);
        res.cookie('jwt', token, { httpOnly: true, secure: false });
        return next();
      }catch(err){
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}
