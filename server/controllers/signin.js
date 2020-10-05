const jwt = require('jsonwebtoken');
let redis = require("redis");

//Setup redis
const redisClient = redis.createClient(process.env.REDIS_URI);


const handleSignin = (db, bcrypt, req, res) => {
  
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        Promise.reject('wrong credentials');
      }
    })
    .catch(err => err)
}

const getAuthTokenId = (req, res) => {
  const {authorization} = req.headers;

  return redisClient.get(authorization, (err, reply) => {
    return err || !reply 
      ?  res.status(400).json("Not authorized") 
      : res.json({id: reply})
  })
}

const signToken = (email) => {
  const jwtPayload = {email};
  
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '2 days'})
}

setToken = (token, id) => {
  return Promise.resolve(redisClient.set(token, id))
}

const createSessions = (user) => {
  //Create/sign JWT token
  const {email, id} = user;
  let token = signToken(email);

  return setToken(token, id)
    .then(() => {
      return {
        success: 'true', 
        userId: id, 
        token
      }
    })
    .catch(console.log);

}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  
  const {authorization} = req.headers;
  //check if auth header is set by client and return auth token else handle signin
  return authorization 
  ? getAuthTokenId(req, res) 
  : handleSignin(db, bcrypt, req, res)
    .then(data => {
      return data.email && data.id ? createSessions(data) : Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err))
}

module.exports = {
  signinAuthentication: signinAuthentication
}