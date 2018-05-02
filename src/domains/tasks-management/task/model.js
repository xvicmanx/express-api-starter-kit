/**
 * @typedef Task
 *
 * @property {string} description
 * @property {string} title.required
 */
module.exports = (db) => {
  const result = db;
  result.models.task = {
    find: () => Promise.resolve([
      {
        _id: 1,
        description: 'test',
      },
    ]),
    findOne: () => Promise.resolve({
      _id: 1,
      description: 'test',
    }),
    create: () => Promise.resolve({
      _id: 1,
      description: 'test',
    }),
    update: () => Promise.resolve({
      _id: 1,
      description: 'test',
    }),
    delete: () => Promise.resolve([{
      _id: 1,
      description: 'test',
    }]),
    deleteOne: () => Promise.resolve({
      _id: 1,
      description: 'test',
    }),
  };
};
