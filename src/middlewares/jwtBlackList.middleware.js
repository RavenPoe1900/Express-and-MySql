
module.exports = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({ error: 'Token missing.' })
    try {
        const redis = await req.app.locals.redisClient.get(token);
        if(redis) return res.status(401).json({ error: 'Invalid token.' });
        next()
    }catch(err){
        res.status(500).json({ error: 'Internal server error.' });
        console.log(err.message);
    }    
}