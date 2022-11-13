const {
    SlashCommandBuilder
} = require('discord.js');
const common = require('../utils/common_modules');
const excelStats = require('./stats/stats_sync');
const info = require('./stats/stats_info');

const FILENAME = __filename.slice(__dirname.length + 1);


/**
 * Get/Set stats information 
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
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