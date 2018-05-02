const express = require('express');
const path = require('path');
const { forEachFile } = require('../../core/helpers');

module.exports = ({ router, db }) => {
  const domainRouter = express.Router();

  forEachFile(path.join(__dirname, '/./'), 'routes', (routes) => {
    routes({
      db,
      router: domainRouter,
    });
  });

  router.use('/test', domainRouter);
};
