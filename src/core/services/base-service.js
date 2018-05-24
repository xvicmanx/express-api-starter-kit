/*
* Importing necessary queries
*/
const queriesBuilder = require('../queries');
const mutationsBuilder = require('../mutations');


class BaseService {
  /**
 * Base Service constructor
 * @param {Object} db - database access object that provides the model.
 * @param {string} model - model name
 */
  constructor(db, model) {
    this.queries = queriesBuilder(db, model);
    this.mutations = mutationsBuilder(db, model);
  }

  /**
   * Finds one item by its Id
   * @param {string} id - id of the task
   * @returns {Promise}
   */
  findById(id) {
    return this.queries.findById(id);
  }

  /**
   * Finds related objects for the item with Id
   * @param {string} id - id of the task
   * @param {string} related - related model
   * @returns {Promise}
   */
  findByIdRelated(id, related) {
    return this.queries.findByIdRelated(id, related);
  }

  /**
   * Finds one item that satisfies the condition
   * @param {object} condition - condition to search
   * @returns {Promise}
   */
  findOne(condition = {}) {
    return this.queries.findOne(condition);
  }

  /**
   * Finds items that satisfy a given condition
   * @param {object} condition - condition to search
   * @param {object} options - options
   * @returns {Promise<Array>}
   */
  find(condition = {}, options = {}) {
    return this.queries.find(condition, options);
  }

  /**
   * Counts the items that satisfy a given condition
   * @param {object} condition - condition to search
   * @param {object} options - options
   * @returns {Promise<number>} - the total of items
   */
  count(condition = {}, options = {}) {
    return this.queries.count(condition, options);
  }

  /**
   * Updates item that satisfy a given condition
   * @param {object} condition - condition to search
   * @param {object} data - data to update
   * @returns {Promise<Array>}
   */
  update(condition = {}, data = {}) {
    return this.mutations.update(condition, data);
  }

  /**
   * Creates a new item with the provided data
   * @param {object} data - data to update
   * @returns {Promise}
   */
  create(data = {}) {
    return this.mutations.create(data);
  }

  /**
   * Deletes items that satisfy a given condition
   * @param {object} condition - condition
   * @returns {Promise}
   */
  delete(condition = {}) {
    return this.mutations.deleteSome(condition);
  }

  /**
   * Deletes an item that matches a given id
   * @param {string} id - condition
   * @returns {Promise}
   */
  deleteOne(id) {
    return this.mutations.deleteOne(id);
  }
}

module.exports = BaseService;
