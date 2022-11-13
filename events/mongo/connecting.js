const chalk = require('chalk');


/**
 * Sends a message when the mongo connection is connecting.
 */
function execute() {
    console.log(chalk.cyan('[Database Status]: Connecting...'));
}

module.exports = {
    name: 'connecting',
    execute
};