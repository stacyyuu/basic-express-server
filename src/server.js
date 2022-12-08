const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const validator = require('./middleware/validator')
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');

// Adding routes to get reqs/send res
app.get('/', logger, (req, res, next) => {
  res.status(200).send('Hello World!');
});

app.get('/person', validator, (req, res) => {
  res.status(200).send({ name: req.name });
});

// Using errors when all other routes placed or no name used in query string
app.use('*', notFound);
app.use(serverError);

function start(){
  app.listen(process.env.PORT || 3002, () => console.log(`listening on ${process.env.PORT}`));
}

module.exports = { start };