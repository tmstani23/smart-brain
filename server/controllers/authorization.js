const redisClient = require('./signin').redisClient;

const requireAuth = (req, res, next) => {
    const {authorization} = req.headers;
    //if no authorization headers or auth token doesn't exist in redis db throw an error
    if (!authorization) {
        return res.status(401).json('User not authorized.')
    }
    return redisClient.get(authorization, (err, reply) => {
        //console.log(authorization, 'authorization')
        if (err || !reply) {
            
            return res.status(401).json('User not authorized in db.')
        }
        //Else allow user to access endpoint
        console.log('you shall pass');
        return next()
    })
    
}

module.exports = {
    requireAuth: requireAuth
}
