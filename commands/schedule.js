const change = require('./schedule/schedule_change');
const info = require('./schedule/schedule_info');

exports.help = {
    name: 'schedule'
};

/**
 * Sends the current version of Botlin
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    if (args == '') {
        info.getScheduleInfo(client, message);
    } else {
        change.setNewSchedule(args, client, message);
    }
};