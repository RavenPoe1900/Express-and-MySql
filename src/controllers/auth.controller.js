const AuthService = require('../service/authService.js');
const { comparePassword, createOrRefreshToken } = require('../utils/functions.js');
const {key, expires} = require('../../config/config.js').JWT;
const {refreshKey, refreshExpires} = require('../../config/config.js').REFRESHJWT;
const jwt = require('jsonwebtoken');
const authService = new AuthService();
require('express-async-errors');

const login = async (req, res) => {
  let consult = await authService.findByUserName(req.app.locals.models, req.body.userName);
  if(consult.error) throw new CustomError(consult.error, consult.http);
  const equal = await comparePassword(req.body.password, consult.password);
  if(equal){
    const token = createOrRefreshToken(consult.id, consult.userName, key, expires);
    person = {
      name: consult.name,
      userName: consult.userName,
      password: consult.password,
      refreshToken: createOrRefreshToken(consult.id, consult.userName, refreshKey, refreshExpires)
    }
    consult = await authService.updatePerson(person, consult.id, req.app.locals.models)
    if(consult.error) throw new CustomError(consult.error, consult.http);
    res.cookie('jwt', token, { httpOnly: true, secure: false });
    res.send('Register success'); 
  } else throw new CustomError('The password not mach.', 404);
};

const logout = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, key);
  const expire = decodedToken.exp - parseInt(Date.now() / 1000);
  await req.app.locals.redisClient.set(token, 'value', {EX: expire, NX: true});
	res.clearCookie('jwt');
	return res.sendStatus(200);
};

module.exports = {
	login,
	logout,
};