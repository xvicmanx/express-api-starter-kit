/**
 * This file contains the local db (disk) driver
 */

const Sequelize = require('sequelize');
const wrapper = require('./wrapper');
const { validateProxy } = require('../../validation');
const { dataTransformProxy } = require('./data-transform');
const mapFields = require('./map-fields');

const relateModels = (definitions, models) => {
  Object.keys(definitions)
    .forEach((name) => {
      const definition = definitions[name];
      const model = models[name];

      Object.keys(definition.fields)
        .filter(fieldName => definition.fields[fieldName].model)
        .forEach((fieldName) => {
          const field = definition.fields[fieldName];
          const targetModel = models[field.model];
          if (field.many) {
            model.hasMany(targetModel);
          } else {
            model.belongsTo(targetModel);
          }
        });
    });
};


/**
 * SQL db driver
 */
class SQLDBDriver {
  /**
   * Constructor
   * @param {Object} configuration - configuration
   */
  constructor(config) {
    this.db = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        dialect: config.dialect,
        storage: config.storage,
      },
    );
    this.definitions = {};
    this.models = {};
  }
  /**
   * Add a models to the DB
   * @param {Object} model - the model definition
   */
  addModel(modelDefinition) {
    this.definitions[modelDefinition.name] = modelDefinition;
    this.models[modelDefinition.name] = this.db.define(
      modelDefinition.name,
      mapFields(modelDefinition.fields),
    );
  }

  /**
   * Get access to the model.
   * @param {string} name - name of the model to retrieve.
   */
  getModel(name) {
    const wrappedModel = dataTransformProxy(
      wrapper(this.models[name]),
      this.definitions[name],
    );

    return validateProxy(
      wrappedModel,
      this.definitions[name],
    );
  }

  /**
   * Synchronizes the data base.
   * @returns {Promise}
   */
  sync() {
    relateModels(this.definitions, this.models);

    const promises = Object.keys(this.models)
      .map(n => this.models[n].sync({ force: false }));

    return new Promise((resolve) => {
      Promise.all(promises).then(() => {
        resolve(this);
      });
    });
  }
}

module.exports = SQLDBDriver;
