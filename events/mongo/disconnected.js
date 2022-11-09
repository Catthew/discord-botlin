const chalk = require('chalk');


function execute() {
    console.log(chalk.red('[Database Status]: Disconnected.'));
}

module.exports = {
    name: 'disconnected',
    execute
};