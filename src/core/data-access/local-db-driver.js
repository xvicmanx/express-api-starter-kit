const db = require('diskdb');
const { createDir } = require('../helpers');

const wrapper = model => ({
  find: () => Promise.resolve(model.find()),
  findOne: () => Promise.resolve(model.find()),
  create: data => Promise.resolve(model.save(data)),
  update: () => Promise.resolve(model.find()),
  delete: () => Promise.resolve(model.find()),
  deleteOne: () => Promise.resolve(model.find()),
});

class LocalDBDriver {
  constructor(dir) {
    this.dir = dir || `${__dirname}/../../../.db/`;
    this.db = db;
    this.modelNames = [];
  }

  addModel(model) {
    this.modelNames.push(model.name);
  }

  getModel(name) {
    return wrapper(this.db[name]);
  }

  sync() {
    createDir(this.dir);
    this.db.connect(this.dir, this.modelNames);
  }
}

module.exports = LocalDBDriver;
