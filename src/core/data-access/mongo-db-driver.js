const mongoose = require('mongoose');
const { promify } = require('../helpers');

/**
  * Creates model wrapper
  * @param {Object} model - the model.
  */
const wrapper = model => ({
  /**
   * Find items that match certain condition
   * @param {Object} condition - the condition
   * @returns {Promise<Array>} - the found items
   */
  find: condition => promify(model.find, condition),
  /**
   * Find an item that matches the given id
   * @param {number} id - the item's id
   * @returns {Promise} - the found item
   */
  findById: id => promify(model.findById, id),
  /**
   * Find an item that matches certain condition
   * @param {Object} condition - the condition
   * @returns {Promise} - the found item
   */
  findOne: condition => promify(model.findOne, condition),
  /**
   * Counts the items that match certain condition
   * @param {Object} condition - the condition
   * @returns {Promise<number>} - the total items
   */
  count: condition => promify(model.count, condition)
    .then(count => ({ count })),
  /**
   * Creates a new item with the provided data
   * @param {Object} data - the data of the item
   * @returns {Promise} -  the created item
   */
  create: data => promify(model.create, data),
  /**
   * Updates items that matches certain condition with the provided data
   * @param {Object} condition - the condition
   * @param {Object} data - the data of the item
   * @returns {Promise<Array>} -  the updated items
   */
  update: (condition, data) => promify(model.update, condition, data, { multi: true }),
  /**
   * Deletes the items that match the given condition
   * @param {Object} condition - the condition
   * @returns {Promise<Array>} -  the removed items
   */
  delete: (condition) => {
    if (!condition || Object.keys(condition) <= 0) return Promise.resolve([]);
    return promify(model.deleteMany, condition);
  },
  /**
   * Deletes the item with the given id
   * @param {number} id - the id
   * @returns {Promise} -  the removed item
   */
  deleteOne: id => promify(model.deleteOne, { _id: id }),
});

/**
 * @typedef MongoConfig
 * @property {string} username - mongo username
 * @property {string} password - mongo user password
 * @property {string} host - DB server host
 * @property {number} port - DB server port
 * @property {string} database - Database name
 */

/**
 * Build the uri from the config object
 * @param {MongoConfig} config - configuration object
 */
const buildURI = (config) => {
  const credentials = `${config.username}:${config.password}`;
  const server = `${config.host}:$${config.port}`;
  return `mongodb:${credentials}@${server}/${config.database}`;
};

/**
 * Mongodb driver
 */
class MongoDBDriver {
  /**
   * Create a database at a given location
   * @param {string} dir - directory of the database
   */
  constructor(config) {
    this.mongoose = mongoose;
    this.mongoose.connect(buildURI(config));
    this.definitions = [];
  }
  /**
   * Add the model definiton
   * @param {Object} model - the model definition
   */
  addModel(model) {
    this.definitions.push(model);
  }

  /**
   * Get access to the model.
   * @param {string} name - name of the model to retrieve.
   * @returns {}
   */
  getModel(name) {
    return wrapper(this.mongoose.model(name));
  }

  /**
   * Synchronizes the data base.
   */
  sync() {
    this.definitions.forEach((definition) => {
      this.mongoose.model(
        definition.name,
        mongoose.Schema(definition.fields),
      );
    });
  }
}

module.exports = MongoDBDriver;
