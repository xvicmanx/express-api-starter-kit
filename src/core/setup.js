const express = require('express');
const path = require('path');
const swaggerGenerator = require('express-swagger-generator');
const { forEachFile, getAPIVersion } = require('./helpers');
const swaggerConfig = require('./swagger.config');
const Driver = require('../core/data-access/local-db-driver');

const forEachRoutesFile = (cb) => {
  forEachFile(path.join(__dirname, '/../domains/'), 'setupRoutes', cb);
};

const forEachModelFile = (cb) => {
  forEachFile(path.join(__dirname, '/../domains/'), 'model', cb);
};

const setupDB = () => {
  const db = new Driver();

  forEachModelFile((model) => {
    db.addModel(model());
  });

  db.sync();

  return db;
};

const setUpRoutes = (context) => {
  const router = express.Router();
  forEachRoutesFile((routes) => {
    routes({
      db: context.db,
      router,
    });
  });
  context.app.use(`/${getAPIVersion()}`, router);
};

const setUpSwaggerDocumentation = (app) => {
  const expressSwagger = swaggerGenerator(app);
  expressSwagger(swaggerConfig);
};

module.exports = (app) => {
  const db = setupDB();
  setUpRoutes({ db, app });
  setUpSwaggerDocumentation(app);
};
