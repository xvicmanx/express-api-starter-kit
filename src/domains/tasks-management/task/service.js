const findOne = require('./queries/find-one.query');
const findById = require('./queries/find-by-id.query');
const find = require('./queries/find.query');
const update = require('./mutations/update.mutation');
const create = require('./mutations/create.mutation');
const deleteSome = require('./mutations/delete.mutation');
const deleteOne = require('./mutations/delete-one.mutation');


class Service {
  constructor(db) {
    this.db = db;
  }

  /**
   * Finds one task by its Id
   * @param {string} id - id of the task
   * @returns {Promise}
   */
  findById(id) {
    return findById(this.db, id);
  }

  /**
   * Finds one task that satisfies the condition
   * @param {object} condition - condition to search
   * @returns {Promise}
   */
  findOne(condition = {}) {
    return findOne(this.db, condition);
  }

  /**
   * Finds tasks that satisfy a given condition
   * @param {object} condition - condition to search
   * @param {object} options - options
   * @returns {Promise<Array>}
   */
  find(condition = {}, options = {}) {
    return find(this.db, condition, options);
  }

  /**
   * Updates tasks that satisfy a given condition
   * @param {object} condition - condition to search
   * @param {object} data - data to update
   * @returns {Promise<Array>}
   */
  update(condition = {}, data = {}) {
    return update(this.db, condition, data);
  }

  /**
   * Creates a new task with the provided data
   * @param {object} data - data to update
   * @returns {Promise}
   */
  create(data = {}) {
    return create(this.db, data);
  }

  /**
   * Deletes tasks that satisfy a given condition
   * @param {object} condition - condition
   * @returns {Promise<Array>}
   */
  delete(condition = {}) {
    return deleteSome(this.db, condition);
  }

  /**
   * Deletes a task that matches a given id
   * @param {string} id - condition
   * @returns {Promise}
   */
  deleteOne(id) {
    return deleteOne(this.db, id);
  }
}

module.exports = Service;
