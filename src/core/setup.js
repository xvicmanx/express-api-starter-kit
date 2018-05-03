/**
 * This file setups the application by setting up the database,
 * routes and swagger API docs generation.
 */
const express = require('express');
const path = require('path');
const swaggerGenerator = require('express-swagger-generator');
const { forEachFile, getAPIVersion } = require('./helpers');

const swaggerConfig = require('../../config/swagger.config');
const databaseConfig = require('../../config/database.config');

/* eslint-disable */
/**
 * Loads the database driver specified in the database config file.
 * @returns {Object} the loaded driver.
 */
const getDriver = () => {
  return require(`../core/data-access/${databaseConfig.driver}-driver`);
};
 /* eslint-enable */

/**
  * Finds all the setupRoutes file of all the domains.
  * @param {function} cb - callback function that it is called for each found route file.
  */
const forEachRoutesFile = (cb) => {
  forEachFile(path.join(__dirname, '/../domains/'), 'setupRoutes', cb);
};

/**
 * Finds all the model files in all the domains
 * @param {function} cb - callback function that it is called for every found model file.
 */
const forEachModelFile = (cb) => {
  forEachFile(path.join(__dirname, '/../domains/'), 'model', cb);
};

/**
 * Setups the project data base by getting the driver,
 * and adding each model to it to be setup.
 * @returns the setup data base driver (Access object)
 */
const setupDB = () => {
  const Driver = getDriver();
  const driverName = databaseConfig.driver;
  const db = new Driver(databaseConfig.configs[driverName]);

  forEachModelFile((model) => {
    db.addModel(model());
  });

  db.sync();

  return db;
};

/**
 * Setups all the routes of the application.
 * @param {Object} context - application context that contains the database, and parent router.
 */
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

/**
 * Setups Swagger API automatic generation based on docstrings.
 * @param {Object} app - express application
 */
const setUpSwaggerDocumentation = (app) => {
  const expressSwagger = swaggerGenerator(app);
  expressSwagger(swaggerConfig);
};

/**
 * Setups the application setting up the database, routes and swagger API docs generation.
 * @param {Object} app - express application
 */
module.exports = (app) => {
  const db = setupDB();
  setUpRoutes({ db, app });
  setUpSwaggerDocumentation(app);
};
