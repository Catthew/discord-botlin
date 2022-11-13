const chalk = require('chalk');


/**
 * Sends a message when the mongo connection connected successfully.
 */
function execute() {
    console.log(chalk.green('[Database Status]: Connected.'));
}

module.exports = {
    name: 'connected',
    execute
};