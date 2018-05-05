const { DATABASE_DRIVERS, SQL_DIALECTS } = require('./internal/constants');

module.exports = {
  driver: DATABASE_DRIVERS.SQL_DB,
  configs: {
    [DATABASE_DRIVERS.SQL_DB]: {
      username: 'foo',
      password: 'bar',
      host: 'localhost',
      port: 1234,
      database: 'testdb',
      dialect: SQL_DIALECTS.SQLITE,
      storage: `${__dirname}/../project.sqlite`, // SQLITE
    },
    [DATABASE_DRIVERS.MONGO_DB]: {
      username: 'foo',
      password: 'bar',
      host: 'localhost',
      port: 1234,
      database: 'testdb',
    },
  },
};
