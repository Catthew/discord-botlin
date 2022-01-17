const change = require('./schedule/schedule_change');
const info = require('./schedule/schedule_info');
const time = require('./schedule/schedule_time');
const responses = require('../responses');
/**
 * Sends the current version of Botlin.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    switch(args[0]){
        case 'cancel':
        case 'uncancel':
            change.setNewSchedule(args, client, message);
            break;
        case 'time':
            time.setScheduleTime(args, client, message);
            break;
        case undefined:
            info.getScheduleInfo(client, message);
            break;
        default:
            message.channel.send(responses.unknown_command).catch(console.error);
    }
};