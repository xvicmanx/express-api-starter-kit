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

module.exports = {
  forEachFile,
  getAPIVersion,
  getHostName,
  getPort,
  createDir,
};
