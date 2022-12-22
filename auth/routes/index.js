const express = require('express');
const base64 = require('js-base64');
const { User } = require('../models');

const authRoutes = express();

// Creating or logging in user with username and password using /signup and /signin routes
authRoutes.post('/signup', signUp);
authRoutes.post('/signin', signIn);

async function signUp(req, res, next) {
  const { username, password } = req.body;
  await User.createWithHashed(username, password);
  res.send(201);
}

async function signIn(req, res, next) {
  let auth = req.header('Authorization');
  if (!auth.startsWith('Basic')) {
    next(new Error('Invalid Login.'));
    return;
  }

  auth = base64.decode(auth.replace('Basic ', ''));

  console.log('Basic auth request', auth);

  const [username, password] = auth.split(':');
  let user = await User.findLoggedIn(username, password);
  if (user) {
    res.status(200).send({ username: user.username });
  } else {
    next(new Error('Invalid Login.'));
  }
}

module.exports = { authRoutes };
