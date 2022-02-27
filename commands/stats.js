const excelStats = require('../cron_jobs/excel_stats');
const info = require('./stats/stats_info');
const responses = require('../responses');
/**
 * Sends the current version of Botlin.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    switch(args[0]){
        case 'sync':
            excelStats.syncStats(process.env.SPREADSHEET, client);
            break;
        case undefined:
            info.getStatsInfo(client, message);
            break;
        default:
            message.channel.send(responses.unknown_command).catch(console.error);
    }
};