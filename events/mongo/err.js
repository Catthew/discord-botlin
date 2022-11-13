const chalk = require('chalk');


/**
 * Sends a message when the mongo connection has an error.
 * @param {string} err The error the Mongo connection faced.
 */
function execute(err) {
    console.log(chalk.red(`An error occured with the database connection:\n${err}`));
}

module.exports = {
    name: 'err',
    execute
};