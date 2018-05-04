/**
 * This file contains the local db (disk) driver
 */

const Sequelize = require('sequelize');
const wrapper = require('./wrapper');
const { validateProxy } = require('../../validation');
const { DATA_TYPES } = require('../../internal/constants');

const typesMap = {
  [DATA_TYPES.STRING]: Sequelize.STRING,
  [DATA_TYPES.CHAR]: Sequelize.CHAR,
  [DATA_TYPES.TEXT]: Sequelize.TEXT,
  [DATA_TYPES.TINY_INT]: Sequelize.TINYINT,
  [DATA_TYPES.SMALL_INT]: Sequelize.SMALLINT,
  [DATA_TYPES.MEDIUM_INT]: Sequelize.MEDIUMINT,
  [DATA_TYPES.INTEGER]: Sequelize.INT,
  [DATA_TYPES.BIG_INT]: Sequelize.BIGINT,
  [DATA_TYPES.FLOAT]: Sequelize.FLOAT,
  [DATA_TYPES.DOUBLE]: Sequelize.DOUBLE,
  [DATA_TYPES.DECIMAL]: Sequelize.DECIMAL,
  [DATA_TYPES.DATE]: Sequelize.DECIMAL,
  [DATA_TYPES.BOOLEAN]: Sequelize.BOOLEAN,
  [DATA_TYPES.ID]: Sequelize.UUID,
  [DATA_TYPES.ENUM]: Sequelize.ENUM,
};

const mapFields = fields => Object.keys(fields).reduce((res, k) => {
  const result = res;
  let extension = {};
  if (fields[k].type) {
    extension = { type: typesMap[fields[k].type] };
  }
  result[k] = Object.assign(
    {},
    fields[k],
    extension,
  );
  return result;
}, {});

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
  addModel(model) {
    this.definitions[model.name] = model;
    this.models[model.name] = this.db.define(
      model.name,
      mapFields(model.fields),
    );
  }

  /**
   * Get access to the model.
   * @param {string} name - name of the model to retrieve.
   */
  getModel(name) {
    return validateProxy(
      wrapper(this.models[name]),
      this.definitions[name],
    );
  }

  /**
   * Synchronizes the data base.
   */
  sync() {
    const promises = Object.keys(this.models)
      .map(k => this.models[k].sync({ force: false }));
    Promise.all(promises);
  }
}

module.exports = SQLDBDriver;
