module.exports = {
  create: model => (db, data) => db.models[model].create(data),
  deleteOne: model => (db, id) => db.models[model].deleteOne(id),
  delete: model => (db, condition) => db.models[model].delete(condition),
  update: model => (db, condition, data) => db.models[model].update(condition, data),
};
