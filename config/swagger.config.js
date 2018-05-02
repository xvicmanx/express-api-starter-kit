// See https://github.com/pgroot/express-swagger-generator for more details
const { getAPIVersion, getHostName, getPort } = require('../src/core/helpers');

module.exports = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample app',
      title: 'My Application',
      version: '1.0.0',
    },
    host: `${getHostName()}:${getPort()}`,
    basePath: `/${getAPIVersion()}`,
    produces: [
      'application/json',
      'application/xml',
    ],
    schemes: ['http', 'https'],
  },
  basedir: __dirname,
  files: ['../domains/**/*.js'],
};
