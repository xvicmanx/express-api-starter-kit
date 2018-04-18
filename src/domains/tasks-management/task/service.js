const findByIdQuery = require('./queries/find-by-id.query');

class Service {
  constructor(db) {
    this.db = db;
  }

  getById(id) {
    return findByIdQuery(this.db, id);
  }
}

module.exports = Service;
