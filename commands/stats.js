const {
    SlashCommandBuilder
} = require('discord.js');
const common = require('../utils/common_functions');
const excelStats = require('./stats/stats_set');
const info = require('./stats/stats_info');
const { Responses } = require('../utils');

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
            common.logAndSendError(Responses['unknown_command'], FILENAME, message, Responses['unknown_command']);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Checks which stats command was called.'),
    execute
};