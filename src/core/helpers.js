// Helpers file
const DynRequire = require('dyn-require');
const fs = require('fs');

/**
 * Finds all the files in a given directory that contains certain text.
 * @param {string} dir - parent directory
 * @param {string} str - target string that the file should contain in its name
 * @param {function} cb - call back that is called for every matching file.
 */
const forEachFile = (dir, str, cb) => {
  const modules = new DynRequire(dir);
  const filesMap = modules.requireAllEx();
  Object.entries(filesMap).forEach((entry) => {
    if (entry[0].indexOf(str) > -1) {
      cb(entry[1]);
    }
  });
};

/**
 * Create a directory if it does not exist.
 * @param {string} dir - directory to create.
 */
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

/**
 * Returns the version of the API
 */
const getAPIVersion = () => process.env.API_VERSION || 'v1';
/**
 * Returns the host name of the API
 */
const getHostName = () => process.env.HOST_NAME || 'localhost';
/**
 * Returns the port of the server.
 */
const getPort = () => process.env.PORT || 3000;

/**
 * Recursively go through an object and gets the value of the
 * property queried.
 *
 * @param {Object} source - target object
 * @param {string} query - property query
 * @param {any} defaultValue - default value to return when property is not found
 * @returns {any} - the found property, otherwise the default value
 */
const queryValue = (source, query = '', defaultValue = null) => {
  const value = query.split('.').reduce((result, key) => (result && result[key] ? result[key] : null), source);
  return value || defaultValue;
};

/**
 * Handles a query promise
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Array} expectedArgs - expected arguments
 */
const handleQuery = (req, res, expectedArgs = []) => {
  expectedArgs.forEach((arg) => {
    if (!queryValue(req, arg)) {
      res.status(400).send(`Missing argument ${arg.split('.')[0]}`);
    }
  });
  return promise => promise.then((result) => {
    if (!result || (Array.isArray(result) && !result.length)) {
      res.status(404);
    }
    res.send(result);
  }).catch((err) => {
    res.status(500);
    res.send('An error has occured while executing the search', err);
  });
};

/**
 * Handles a mutation promise
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Array} expectedArgs - expected arguments
 */
const handleMutation = (req, res, expectedArgs = []) => {
  expectedArgs.forEach((arg) => {
    if (!queryValue(req, arg)) {
      res.status(400).send(`Missing argument ${arg}`);
    }
  });
  return promise => promise.then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500);
    res.send('An error has occured while executing the search', err);
  });
};

module.exports = {
  forEachFile,
  getAPIVersion,
  getHostName,
  getPort,
  createDir,
  queryValue,
  handleQuery,
  handleMutation,
};
