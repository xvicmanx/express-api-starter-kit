const express = require('express');
const swaggerGenerator = require('express-swagger-generator');
const { forEachFile, getAPIVersion } = require('./helpers');
const swaggerConfig = require('./swagger.config');

const forEachRoutesFile = (cb) => {
  forEachFile('/../domains/', 'routes', cb);
};

const forEachModelFile = (cb) => {
  forEachFile('/../domains/', 'model', cb);
};

const setupDB = () => {
  const db = {
    foo: {
      findOneAsync: id => Promise.resolve({
        _id: id,
        name: 'Foo test',
      }),
    },
  };

  forEachModelFile((model) => {
    model(db);
  });

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
