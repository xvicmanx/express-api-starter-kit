module.exports = {
  create: model => (db, data) => db.getModel(model).create(data),
  deleteOne: model => (db, id) => db.getModel(model).deleteOne(id),
  delete: model => (db, condition) => db.getModel(model).delete(condition),
  update: model => (db, condition, data) => db.getModel(model).update(condition, data),
};
