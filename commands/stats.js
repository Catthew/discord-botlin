const {
    SlashCommandBuilder
} = require('discord.js');
const common = require('../utils/common_functions');
const excelStats = require('../cron/modules/excel_stats');
const info = require('./stats/stats_info');
const { Responses } = require('../utils/constants');

const filename = __filename.slice(__dirname.length + 1);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Checks which stats command was called.'),
    async execute(args, client, message) {
        switch (args[0]) {
            case 'sync':
                if (common.isAdmin(message)) excelStats.syncStats(process.env.SPREADSHEET, client, true);
                break;
            case undefined:
                info.getStatsInfo(client, message);
                break;
            default:
                common.logAndSendError(Responses['unknown_command'], filename, message, Responses['unknown_command']);
        }
    }
};