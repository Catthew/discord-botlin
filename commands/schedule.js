const common = require('../common_functions');
const scheduleInfo = require('./schedules/schedule_info');
const scheduleMode = require('./schedules/schedule_mode');
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
    if (command == '-mode') scheduleMode.setScheduleMode(args, client, message);
    else if (command === undefined) scheduleInfo.getScheduleInfo(client, message);
    else common.logAndSendError(responses['unknown_command'], filename, message, responses['unknown_command']);
};