const express = require('express');
const bodyParser = require('body-parser');
const setup = require('../src/core/setup');
const { getPort } = require('../src/core/helpers');

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

app.listen(port, (err) => {
  if (err) {
    log('An error has occurred', err);
  } else {
    log(`Listening on port ${port}`);
  }
});
