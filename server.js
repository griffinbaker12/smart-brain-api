const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'smart-brain',
  },
});

const { handleSignin } = require('./controllers/signin');
const { handleRegister } = require('./controllers/register');
const { handleProfile } = require('./controllers/profile');
const { handleImage } = require('./controllers/image');
const { handleApiCall } = require('./controllers/image');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('success');
});

app.post('/signin', handleSignin(knex, bcrypt));
app.post('/register', (req, res) => handleRegister(req, res, knex, bcrypt));
app.get('/profile/:id', (req, res, knex) => handleProfile(req, res, knex));
app.put('/image', (req, res) => handleImage(req, res, knex));
app.post('/imageurl', (req, res) => handleApiCall(req, res));

app.listen(3000, () => {
  console.log('I hear you on port 3000');
});
