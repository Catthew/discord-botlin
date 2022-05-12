const common = require('../common_functions');
const datetimeChange = require('./schedule/update/schedule_datetime_change');
const info = require('./schedule/schedule_info');
const toggle = require('./schedule/update/schedule_toggle');
const responses = require('../constants/responses');

const filename = __filename.slice(__dirname.length + 1);

/**
 * Checks which schedule command was called.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    const command = args[0];
    if (command == 'update') {
        const value = args[1];
        if (value == '-date' || value == '-time') datetimeChange.setScheduleDateTime(args, client, message);
        else if (value == '-session') toggle.setScheduleSession(args, client, message);
        else if (value == '-vacation') toggle.setScheduleVacation(args, client, message);
        else common.logAndSendError(responses.invalidCommandValue[0], filename, message, responses.invalidCommandValue[1]);
    } else if (command === undefined) info.getScheduleInfo(client, message);
    else common.logAndSendError(responses.unknown_command, filename, message, responses.unknown_command);
};