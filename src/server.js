const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const { sequelize } = require('./models');
const { artistRoutes } = require('./routes/artist-routes');
const { showRoutes } = require('./routes/show-routes');
const { authRoutes, checkJWT } = require('../auth');

app.use(express.json());
app.use(authRoutes);
app.use(artistRoutes);
app.use(showRoutes);

// Adding routes to get reqs/send res
app.get('/', logger, (req, res, next) => {
  res.status(200).send('Hello World!');
});

app.get('/person', validator, (req, res) => {
  res.status(200).send({ name: req.name });
});

app.get('/loggedin', checkJWT, (req, res) => {
  res.status(200).send('You are logged in, ' + req.username);
});

// Using errors when all other routes placed or no name used in query string
app.use(serverError);
app.use('*', notFound);

function start() {
  app.listen(process.env.PORT || 3002, async () => {
    await sequelize.sync();
    console.log(`listening on ${process.env.PORT}`);
  });
}

module.exports = {
  app,
  start,
};
