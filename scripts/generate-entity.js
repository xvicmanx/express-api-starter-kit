/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const path = require('path');
const ejs = require('ejs');
const minimist = require('minimist');
const {
  walkSync,
  createDir,
  createFile,
  toCamelCase,
  toPascalCase,
} = require('./helpers');

const { log, error } = console;

const generateEntity = (domain, entity) => {
  const files = walkSync(path.join(__dirname, './code-generation/entity-template'));
  const entityDir = path.join(__dirname, `/../src/domains/${domain}/${entity}`);

  createDir(entityDir);

  files.forEach((filename) => {
    let newFileName = filename.replace(/(.*)entity-template\/(.*)/, '$2');
    const domainInSnake = domain.replace('-', '_');
    const entityInSnake = entity.replace('-', '_');
    const isAEJSFile = filename.indexOf('.ejs') > -1;

    if (isAEJSFile) {
      newFileName = newFileName.replace('.ejs', '');
      const data = {
        domain,
        domainInCamel: toCamelCase(domainInSnake),
        domainInPascalCase: toPascalCase(domainInSnake),
        entity,
        entityInCamel: toCamelCase(entityInSnake),
        entityInPascalCase: toPascalCase(entityInSnake),
      };
      ejs.renderFile(filename, data, {}, (err, str) => {
        if (err) {
          log(err);
        } else {
          createFile(`${entityDir}/${newFileName}`, str);
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

  if (!args.entity) {
    error('Please provide an entity arg');
    return;
  }

  generateEntity(args.domain, args.entity);
};

main();
