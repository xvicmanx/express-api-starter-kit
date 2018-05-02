const findOne = require('./queries/find-one.query');
const find = require('./queries/find.query');
const update = require('./mutations/update.mutation');
const create = require('./mutations/create.mutation');
const deleteSome = require('./mutations/delete.mutation');
const deleteOne = require('./mutations/delete-one.mutation');


class Service {
  constructor(db) {
    this.db = db;
  }

  findOne(id) {
    return findOne(this.db, id);
  }

  find(condition = {}, options = {}) {
    return find(this.db, condition, options);
  }

  update(condition = {}, data = {}) {
    return update(this.db, condition, data);
  }

  create(data = {}) {
    return create(this.db, data);
  }

  delete(condition = {}) {
    return deleteSome(this.db, condition);
  }

  deleteOne(id) {
    return deleteOne(this.db, id);
  }
}

module.exports = Service;
