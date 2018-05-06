const { DATA_TYPES } = require('../../../core/internal/constants');

/**
 * @typedef User
 *
 * @property {string} description.required
 * @property {string} title.required
 */

/**
 * creates a User
 * @returns {object}
 */
module.exports = () => ({
  name: 'user',
  fields: {
    title: {
      type: DATA_TYPES.STRING,
      required: true,
    },
    description: {
      type: DATA_TYPES.STRING,
      required: true,
    },
  },
});
