// Helpers file
const DynRequire = require('dyn-require');
const fs = require('fs');

const forEachFile = (dir, str, cb) => {
  const modules = new DynRequire(dir);
  const filesMap = modules.requireAllEx();
  Object.entries(filesMap).forEach((entry) => {
    if (entry[0].indexOf(str) > -1) {
      cb(entry[1]);
    }
  });
};

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const getAPIVersion = () => process.env.API_VERSION || 'v1';
const getHostName = () => process.env.HOST_NAME || 'localhost';
const getPort = () => process.env.PORT || 3000;

module.exports = {
  forEachFile,
  getAPIVersion,
  getHostName,
  getPort,
  createDir,
};
