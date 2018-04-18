/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const localtunnel = require('localtunnel');
const chalk = require('chalk');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": false}] */
require('dotenv').config();

const port = process.env.PORT || 3000;

const { log } = console; // eslint-disable-line no-console

const tunnel = localtunnel(port, (err, tnl) => {
  if (err) {
    log(chalk.red(err));
  } else {
    log(chalk.green(`Tunnel created at ${tnl.url}`));
  }
});

tunnel.on('close', () => {
  log(chalk.green('Tunnel closed'));
});
