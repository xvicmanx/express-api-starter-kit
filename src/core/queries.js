module.exports = {
  findOne: model => (db, condition) => db.getModel(model).findOne(condition),
  findById: model => (db, id) => db.getModel(model).findById(id),
  find: model => (db, condition = {}, options = {}) => db.getModel(model).find(condition, options),
};
