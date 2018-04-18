const express = require('express');
const setup = require('../src/core/setup');
const { getPort } = require('../src/core/helpers');

require('dotenv').config();

const app = express();
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
