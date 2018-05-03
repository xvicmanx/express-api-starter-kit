/**
 * Group or predefined queries.
 */
module.exports = {
  /**
   * Finds one item that satisfies a given condition.
   * @param {Object} db - database access object that provides the model.
   * @param {Object} condition - condition to find the item.
   * @returns {Promise} - the found item.
   */
  findOne: model => (db, condition) => db.getModel(model).findOne(condition),
  /**
   * Finds one item that matches the given id.
   * @param {Object} db - database access object that provides the model.
   * @param {number} id - id of the desired item.
   * @returns {Promise} - the found item.
   */
  findById: model => (db, id) => db.getModel(model).findById(id),
  /**
   * Finds items that satisfies a given condition.
   * @param {Object} db - database access object that provides the model.
   * @param {Object} condition - condition to find the items.
   * @param {Object} options - some config options of the search.
   * @returns {Promise<Array>} - the found items.
   */
  find: model => (db, condition = {}, options = {}) => db.getModel(model).find(condition, options),
};
