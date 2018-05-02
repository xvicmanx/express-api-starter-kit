module.exports = {
  findOne: model => (db, id) => db.getModel(model).findOne(id),
  find: model => (db, condition = {}, options = {}) => db.getModel(model).find(condition, options),
};
