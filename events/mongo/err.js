const chalk = require('chalk');


function execute(err) {
    console.log(chalk.red(`An error occured with the database connection:\n${err}`));
}

module.exports = {
    name: 'err',
    execute
};