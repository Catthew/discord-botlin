const {
    SlashCommandBuilder
} = require('discord.js');
const excelStats = require('./stats/stats_sync');
const info = require('./stats/stats_info');
const common = require('../utils/common_modules');

const FILENAME = __filename.slice(__dirname.length + 1);


async function execute(args, client, message) {
    switch (args[0]) {
        case 'sync':
            if (common.isAdmin(message)) excelStats.syncStats(process.env.SPREADSHEET, client, true);
            break;
        case undefined:
            info.getStatsInfo(client, message);
            break;
        default:
            common.logAndSendError(common.responses['unknown_command'], FILENAME, message, common.responses['unknown_command']);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Checks which stats command was called.'),
    execute
};