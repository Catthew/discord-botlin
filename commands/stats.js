const common = require('../utils/common_functions');
const excelStats = require('../cron_jobs/scripts/excel_stats');
const info = require('./stats/stats_info');
const responses = require('../utils/constants/responses');

const filename = __filename.slice(__dirname.length + 1);

/**
 * Checks which stats command was called.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    switch (args[0]) {
        case 'sync':
            if (common.isAdmin(message)) excelStats.syncStats(process.env.SPREADSHEET, client, true);
            break;
        case undefined:
            info.getStatsInfo(client, message);
            break;
        default:
            common.logAndSendError(responses['unknown_command'], filename, message, responses['unknown_command']);
    }
};