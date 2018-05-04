/**
 * This file contains the local db (disk) driver
 */
const db = require('diskdb');
const { createDir } = require('../../helpers');
const wrapper = require('./wrapper');
const { validateProxy } = require('../../validation');

/**
 * Local db (Disk) driver
 */
class LocalDBDriver {
  /**
   * Create a database at a given location
   * @param {string} dir - directory of the database
   */
  constructor(dir) {
    this.dir = dir || `${__dirname}/../../../.db/`;
    this.db = db;
    this.definitions = {};
  }
  /**
   * Add a models to the DB
   * @param {Object} model - the model definition
   */
  addModel(model) {
    this.definitions = {
      [model.name]: model,
    };
  }

  /**
   * Get access to the model.
   * @param {string} name - name of the model to retrieve.
   */
  getModel(name) {
    return validateProxy(
      wrapper(this.db[name]),
      this.definitions[name],
    );
  }

  /**
   * Synchronizes the data base.
   */
  sync() {
    createDir(this.dir);
    this.db.connect(this.dir, Object.keys(this.definitions));
  }
}

module.exports = LocalDBDriver;
