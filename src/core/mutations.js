/**
 * Group of mutations.
 * Called mutations to differentiate from queries that only read the data.
 */
module.exports = {
  /**
   * Creates a new item the provided data.
   * @param {Object} db - database access object that provides the model.
   * @param {Object} data - data of the new item.
   * @returns {Promise} - the created object.
   */
  create: model => (db, data) => db.getModel(model).create(data),
  /**
   * Deletes an item that matches a given id.
   * @param {Object} db - database access object that provides the model.
   * @param {number} id - id of the item.
   * @returns {Promise} - the removed object.
   */
  deleteOne: model => (db, id) => db.getModel(model).deleteOne(id),
  /**
   * Deletes a group of items that match certain condition.
   * @param {Object} db - database access object that provides the model.
   * @param {Object} condition - condition to remove the items.
   * @returns {Promise<Array>} - the removed items.
   */
  delete: model => (db, condition) => db.getModel(model).delete(condition),
  /**
   * Updates a group of items that match certain condition.
   * @param {Object} db - database access object that provides the model.
   * @param {Object} condition - condition to update the items.
   * @returns {Promise<Array>} - the updated items.
   */
  update: model => (db, condition, data) => db.getModel(model).update(condition, data),
};
