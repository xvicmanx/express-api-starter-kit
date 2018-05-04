const validator = require('validator');
const { DATA_TYPES } = require('./internal/constants');

function ValidationError(validation) {
  Error.call(this, 'The sent data is invalid!');
  this.name = 'ValidationError';
  this.validation = validation;
  this.stack = (new Error()).stack;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

/**
 * @typedef {Object} ValidationResult
 * @property {Array<string>} errors - validation errors list
 * @property {boolean} valid -  whether is valid or not
 */

const fieldValidators = {
  [DATA_TYPES.STRING]: s => typeof s === 'string',
  [DATA_TYPES.NUMBER]: x => typeof x === 'number',
  [DATA_TYPES.DATE]: d => !!validator.toDate(d),
  [DATA_TYPES.BOOLEAN]: x => validator.isBoolean(x),
  [DATA_TYPES.ARRAY]: x => Array.isArray(x),
};

/**
 * Validates the fields by checking if the provided values are of
 * the correct type.
 * @param {Object} data - model data
 * @param {Object} definition - model definition
 * @returns {ValidationResult} - the validation result
 */
const validateFields = (data, definition) => {
  const errors = [];
  const valid = Object.keys(data).reduce((result, prop) => {
    const x = definition.fields[prop];
    const validate = x.type && fieldValidators[x.type];
    if (validate && !validate(data[prop])) {
      errors.push(`'${prop}' should be <${x.type}>`);
      return false;
    }
    return result;
  }, true);
  return { valid, errors };
};

/**
 * Validates a model by first checking if the required fields
 * are present and then checking if the provided values are of
 * the correct type.
 * @param {Object} data - model data
 * @param {Object} definition - model definition
 * @returns {ValidationResult} - the validation result
 */
const validateModel = (data, definition) => {
  const errors = [];
  const valid = Object.keys(definition.fields).reduce((result, prop) => {
    const { required } = definition.fields[prop];
    const propPresent = required && data[prop];
    if (!propPresent) {
      errors.push(`'${prop}' is missing`);
    }
    return result && (!required || propPresent);
  }, true);

  if (!valid) {
    return {
      valid,
      errors,
    };
  }
  return validateFields(data, definition);
};

const throwErrorIfInvalid = (validation) => {
  if (!validation.valid) {
    throw new ValidationError(validation);
  }
};

const validateProxy = (target, definition) => Object.assign(
  {},
  target,
  {
    create: (data) => {
      throwErrorIfInvalid(validateModel(data, definition));
      return target.create(data);
    },
    update: (data) => {
      throwErrorIfInvalid(validateFields(data, definition));
      return target.update(data);
    },
  },
);

module.exports = {
  validateProxy,
  ValidationError,
};
