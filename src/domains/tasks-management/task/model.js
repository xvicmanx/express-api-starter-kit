const { DATA_TYPES } = require('../../../core/internal/constants');

/**
 * @typedef {object} Task
 *
 * @property {string} description.required
 * @property {string} title.required
 * @property {object} user
 */

/**
 * creates a Task
 * @returns {object}
 */
module.exports = () => ({
  name: 'task',
  fields: {
    title: {
      type: DATA_TYPES.STRING,
      required: true,
    },
    description: {
      type: DATA_TYPES.STRING,
      required: true,
    },
    user: {
      model: 'user',
    },
  },
});
