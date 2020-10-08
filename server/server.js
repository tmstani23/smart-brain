require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization')

const db = knex({
  client: 'pg',
  // connection: {
  //   host : process.env.DB_HOST,
  //   user : process.env.DB_OWNER,
  //   password : process.env.DB_PASS,
  //   database : process.env.DATABASE,
  // },
  connection: process.env.POSTGRES_URI
  
});

//console.log(process.env.DB_HOST, process.env.POSTGRES_URI)

const app = express();

const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('combined'));
app.use(cors(corsOptions))
app.use(bodyParser.json());


app.get('/', (req, res)=> { 
  console.log('server working!');
  res.send(db.users) 
})
app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { 
  register.handleRegister(req, res, db, bcrypt) 
})
// protected routes requiring authentication
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)})


app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
