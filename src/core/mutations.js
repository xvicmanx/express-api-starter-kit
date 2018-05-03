/**
 * Creates a group of mutations for a given model
 * Called mutations to differentiate from queries that only read the data.
 * @param {Object} db - database access object that provides the model.
 * @param {string} - the model name
 */
module.exports = (db, model) => ({
  /**
   * Creates a new item the provided data.
   * @param {Object} data - data of the new item.
   * @returns {Promise} - the created object.
   */
  create: data => db.getModel(model).create(data),
  /**
   * Deletes an item that matches a given id.
   * @param {number} id - id of the item.
   * @returns {Promise} - the removed object.
   */
  deleteOne: id => db.getModel(model).deleteOne(id),
  /**
   * Deletes a group of items that match certain condition.
   * @param {Object} condition - condition to remove the items.
   * @returns {Promise<Array>} - the removed items.
   */
  delete: condition => db.getModel(model).delete(condition),
  /**
   * Updates a group of items that match certain condition.
   * @param {Object} condition - condition to update the items.
   * @returns {Promise<Array>} - the updated items.
   */
  update: (condition, data) => db.getModel(model).update(condition, data),
});
