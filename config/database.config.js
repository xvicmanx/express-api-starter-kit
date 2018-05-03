module.exports = {
  driver: 'local-db', // local-db | mongo-db | 'mysql-db'
  configs: {
    'mysql-db': {},
    'mongo-db': {
      username: 'foo',
      password: 'bar',
      host: 'localhost',
      port: 1234,
      database: 'testdb',
    },
  },
};
