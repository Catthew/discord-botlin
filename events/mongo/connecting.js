const chalk = require('chalk');


function execute() {
    console.log(chalk.cyan('[Database Status]: Connecting...'));
}

module.exports = {
    name: 'connecting',
    execute
};