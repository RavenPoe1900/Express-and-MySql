const jwt = require('jsonwebtoken');
const authService = require('../utils/authService.js');
const { comparePassword } = require('../utils/functions.js');
const JWT_SECRET_KEY = require('../../config/config.js').JWT_SECRET_KEY;
const JWT_SECRET_KEY_EXPIRES = require('../../config/config.js').JWT_SECRET_KEY_EXPIRES;



const register = async (req, res) => {
  const consult = await authService(req, req.body.userName);
  if(consult.error) return res.status(consult.http).send(consult.error);
  const equal = await comparePassword(req.body.password, consult.password);
  if(equal){
    const token = jwt.sign(
          { user_id: `${consult.id}`, userName:`${consult.userName}` },
          JWT_SECRET_KEY,
          {
            expiresIn: JWT_SECRET_KEY_EXPIRES,
          }
        ); 
      res.cookie('jwt', token, { httpOnly: true, secure: false });
      return res.status(200).send();	
  }
  res.status(404).send('The password not mach')
};

const logout = (req, res) => {
	res.clearCookie('jwt');
	return res.sendStatus(200);
};

module.exports = {
	register,
	logout,
};