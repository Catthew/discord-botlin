const chalk = require('chalk');


/**
 * Sends a message when the mongo connection is disconencted.
 */
function execute() {
    console.log(chalk.red('[Database Status]: Disconnected.'));
}

module.exports = {
    name: 'disconnected',
    execute
};