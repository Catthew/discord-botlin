const chalk = require('chalk');


function execute() {
    console.log(chalk.green('[Database Status]: Connected.'));
}

module.exports = {
    name: 'connected',
    execute
};