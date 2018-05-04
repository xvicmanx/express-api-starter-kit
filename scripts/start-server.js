const express = require('express');
const bodyParser = require('body-parser');
const setup = require('../src/core/setup');
const { getPort } = require('../src/core/helpers');
const { ValidationError } = require('../src/core/validation');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = getPort();
const { log } = console;

setup(app);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.validation);
    } else {
      res.status(500).send('Something went wrong!');
    }
  } else {
    next();
  }
});

app.listen(port, (err) => {
  if (err) {
    log('An error has occurred', err);
  } else {
    log(`Listening on port ${port}`);
  }
});
