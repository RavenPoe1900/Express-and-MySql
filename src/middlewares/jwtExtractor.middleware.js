const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = require('../../config/config.js').JWT_SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }
  try{
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    next();
  }catch(err){  
      return res.status(401).json({ error: 'Invalid token' });
  }
}
