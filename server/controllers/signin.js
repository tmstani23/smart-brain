const jwt = require('jsonwebtoken');
let redis = require("redis");

//Setup redis
const redisClient = redis.createClient(process.env.REDIS_URI);


const handleSignin = (db, bcrypt, req, res) => {
  //Check req body inputs for email or password
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  //check the email and hash in the postgres db 
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      // compare the bcrypt hash with the input password
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          // return user object if valid
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
  //go to redis db and check if auth token exists
  return redisClient.get(authorization, (err, reply) => {
    // return error if no auth else return the id and positive reply from redis
    if (err || !reply) {
      
      return res.status(401).send("Not authorized") 
    } 
      return res.json({id: reply})
  })
}

const signToken = (email) => {
  const jwtPayload = {email};
  //Sign the token with the input email and secret
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '2 days'})
}

setToken = (token, id) => {
  // save the token in the redis database along with user id
  return Promise.resolve(redisClient.set(token, id))
}

const createSessions = (user) => {
  //Create/sign JWT token
  const {email, id} = user;
  //Sign the token then save it in redis db and return session success obj
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
  signinAuthentication: signinAuthentication,
  redisClient: redisClient
}