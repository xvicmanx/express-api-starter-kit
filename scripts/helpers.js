/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  let list = filelist;
  fs.readdirSync(dir).forEach((file) => {
    list = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), list)
      : list.concat(path.join(dir, file));
  });
  return list;
};

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const createFile = (filePath, content) => {
  if (fs.existsSync(filePath)) return false;
  fsExtra.ensureFileSync(filePath);
  fs.writeFileSync(filePath, content);
  return true;
};

const toTitleCase = text => `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
const toCamelCase = text => text.replace(/(_)([a-z])/g, (x, y, z) => z.toUpperCase());
const toPascalCase = text => toTitleCase(toCamelCase(text));

module.exports = {
  walkSync,
  createDir,
  createFile,
  toCamelCase,
  toTitleCase,
  toPascalCase,
};
