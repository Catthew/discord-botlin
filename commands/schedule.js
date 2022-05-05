const common = require('../common_functions');
const datetimeChange = require('./schedule/update/schedule_datetime_change');
const info = require('./schedule/schedule_info');
const onOff = require('./schedule/update/schedule_on_off');
const responses = require('../constants/responses');

/**
 * Checks which schedule command was called.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    const command = args[0];
    if (command == 'update') {
        switch (args[1]) {
            case 'on':
            case 'off':
                if (common.isAdmin(message)) onOff.setNewSchedule(args, client, message);
                break;
            case '--date':
            case '--time':
                if (common.isAdmin(message)) datetimeChange.setScheduleDateTime(args, client, message);
                break;
            default:
                message.channel.send(responses.unknown_command).catch(console.error);
        }
    } else if (command === undefined) info.getScheduleInfo(client, message);
    else message.channel.send(responses.unknown_command).catch(console.error);
};