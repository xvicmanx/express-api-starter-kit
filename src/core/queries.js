module.exports = {
  findOne: model => (db, id) => db.models[model].findOne(id),
  find: model => (db, condition = {}, options = {}) => db.models[model].find(condition, options),
};
