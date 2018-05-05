const Sequelize = require('sequelize');
const { DATA_TYPES } = require('../../internal/constants');

const typesMap = {
  [DATA_TYPES.STRING]: Sequelize.STRING,
  [DATA_TYPES.CHAR]: Sequelize.CHAR,
  [DATA_TYPES.TEXT]: Sequelize.TEXT,
  [DATA_TYPES.TINY_INT]: Sequelize.TINYINT,
  [DATA_TYPES.SMALL_INT]: Sequelize.SMALLINT,
  [DATA_TYPES.MEDIUM_INT]: Sequelize.MEDIUMINT,
  [DATA_TYPES.INTEGER]: Sequelize.INT,
  [DATA_TYPES.BIG_INT]: Sequelize.BIGINT,
  [DATA_TYPES.FLOAT]: Sequelize.FLOAT,
  [DATA_TYPES.DOUBLE]: Sequelize.DOUBLE,
  [DATA_TYPES.DECIMAL]: Sequelize.DECIMAL,
  [DATA_TYPES.DATE]: Sequelize.DECIMAL,
  [DATA_TYPES.BOOLEAN]: Sequelize.BOOLEAN,
  [DATA_TYPES.ID]: Sequelize.UUID,
  [DATA_TYPES.ENUM]: Sequelize.ENUM,
};

const mapFields = fields => Object.keys(fields)
  .filter(k => fields[k].type)
  .reduce((res, k) => {
    const result = res;
    let extension = {};
    if (fields[k].type) {
      extension = { type: typesMap[fields[k].type] };
    }
    result[k] = Object.assign(
      {},
      fields[k],
      extension,
    );
    return result;
  }, {});

module.exports = mapFields;
