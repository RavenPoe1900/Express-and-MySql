const CustomError = require('../utils/customError.js');
require('express-async-errors');

module.exports = async (req, res, next) => {
    const df = fg;
    const token = req.cookies.jwt;
    if(!token) throw new CustomError('Token missing.', 401);
    try {
        const redis = await req.app.locals.redisClient.get(token);
        if(redis) new CustomError('Invalid token.', 401);
        next()
    }catch(err){
        throw new CustomError('Internal server error.', 500);
    }    
}