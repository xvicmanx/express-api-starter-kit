const { DATABASE_DRIVERS } = require('./internal/constants');

module.exports = {
  driver: DATABASE_DRIVERS.LOCAL_DB,
  configs: {
    [DATABASE_DRIVERS.MYSQL_DB]: {},
    [DATABASE_DRIVERS.MONGO_DB]: {
      username: 'foo',
      password: 'bar',
      host: 'localhost',
      port: 1234,
      database: 'testdb',
    },
  },
};
