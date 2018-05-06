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
  find: (condition, options = {}) => model.findAll({ ...options, where: condition }),
  /**
   * Find an item that matches the given id
   * @param {number} id - the item's id
   * @returns {Promise} - the found item
   */
  findById: (id, options = {}) => model.findOne({ ...options, where: { id } }),
  /**
   * Find an item that matches certain condition
   * @param {Object} condition - the condition
   * @returns {Promise} - the found item
   */
  findOne: (condition, options = {}) => model.findOne({ ...options, where: condition }),
  /**
   * Counts the items that match certain condition
   * @param {Object} condition - the condition
   * @returns {Promise} - the total items
   */
  count: (condition) => {
    const result = model.findAndCountAll(condition);
    if (!Array.isArray(result)) return Promise.resolve({ count: 0 });
    return result;
  },
  /**
   * Creates a new item with the provided data
   * @param {Object} data - the data of the item
   * @returns {Promise} -  the created item
   */
  create: data => model.create(data),
  /**
   * Updates items that matches certain condition with the provided data
   * @param {Object} condition - the condition
   * @param {Object} data - the data of the item
   * @returns {Promise<Array>} -  the updated items
   */
  update: (condition, data) => model.update(data, { where: condition }),
  /**
   * Deletes the items that match the given condition
   * @param {Object} condition - the condition
   * @returns {Promise<Array>} -  the removed items
   */
  delete: (condition) => {
    if (!condition || Object.keys(condition) <= 0) return Promise.resolve([]);
    return model.destroy({ where: condition });
  },
  /**
   * Deletes the item with the given id
   * @param {number} id - the id
   * @returns {Promise} -  the removed item
   */
  deleteOne: id => model.destroy({ where: { id }, limit: 1 }),
});

module.exports = wrapper;
