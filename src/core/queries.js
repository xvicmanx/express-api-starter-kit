/**
 * Creates a group of predefined queries for a model
 * @param {Object} db - database access object that provides the model.
 * @param {string} model - model name
 */
module.exports = (db, model) => ({
  /**
   * Finds one item that satisfies a given condition.
   * @param {Object} condition - condition to find the item.
   * @returns {Promise} - the found item.
   */
  findOne: condition => db.getModel(model).findOne(condition),
  /**
   * Finds one item that matches the given id.
   * @param {number} id - id of the desired item.
   * @returns {Promise} - the found item.
   */
  findById: id => db.getModel(model).findById(id),
  /**
   * Finds items that satisfies a given condition.
   * @param {Object} condition - condition to find the items.
   * @param {Object} options - some config options of the search.
   * @returns {Promise<Array>} - the found items.
   */
  find: (condition = {}, options = {}) => db.getModel(model).find(condition, options),
  /**
   * Counts the items that satisfies a given condition.
   * @param {Object} condition - condition to find the items.
   * @param {Object} options - some config options of the search.
   * @returns {Promise<number>} - the total of items.
   */
  count: (condition = {}, options = {}) => db.getModel(model).count(condition, options),
});
