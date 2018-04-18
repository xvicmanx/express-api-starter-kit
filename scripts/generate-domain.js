/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const path = require('path');
const ejs = require('ejs');
const minimist = require('minimist');
const {
  walkSync,
  createDir,
  createFile,
} = require('./helpers');

const { log, error } = console;

const generateDomain = (domain) => {
  const files = walkSync(path.join(__dirname, './code-generation/domain-template'));
  const domainDir = path.join(__dirname, `/../src/domains/${domain}`);

  createDir(domainDir);

  files.forEach((filename) => {
    let newFileName = filename.replace(/(.*)domain-template\/(.*)/, '$2');
    const isAEJSFile = filename.indexOf('.ejs') > -1;
    if (isAEJSFile) {
      newFileName = newFileName.replace('.ejs', '');

      ejs.renderFile(filename, { domain }, {}, (err, str) => {
        if (err) {
          log(err);
        } else {
          createFile(`${domainDir}/${newFileName}`, str);
        }
      });
    }
  });
};

const main = () => {
  const args = minimist(process.argv.slice(2));

  if (!args.domain) {
    error('Please provide a domain arg');
    return;
  }

  generateDomain(args.domain, args.entity);
};

main();
