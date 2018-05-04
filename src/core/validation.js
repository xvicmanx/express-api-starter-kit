const validator = require('validator');
const objectid = require('objectid');
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

const fieldValidators = (() => {
  const validators = {
    id: s => objectid.isValid(s),
    string: s => typeof s === 'string',
    number: x => typeof x === 'number',
    date: d => !!validator.toDate(d),
    boolean: x => validator.isBoolean(x),
    enum: (x, conf) => conf.values.indexOf(x) > -1,
  };

  return {
    ENUM: validators.enum,
    [DATA_TYPES.STRING]: validators.string,
    [DATA_TYPES.CHAR]: validators.string,
    [DATA_TYPES.TEXT]: validators.string,
    [DATA_TYPES.TINY_INT]: validators.number,
    [DATA_TYPES.SMALL_INT]: validators.number,
    [DATA_TYPES.MEDIUM_INT]: validators.number,
    [DATA_TYPES.INTEGER]: validators.number,
    [DATA_TYPES.BIG_INT]: validators.number,
    [DATA_TYPES.FLOAT]: validators.number,
    [DATA_TYPES.DOUBLE]: validators.number,
    [DATA_TYPES.DECIMAL]: validators.number,
    [DATA_TYPES.DATE]: validators.date,
    [DATA_TYPES.BOOLEAN]: validators.boolean,
    [DATA_TYPES.ID]: validators.id,
  };
})();


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
    if (validate && !validate(data[prop], x)) {
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
