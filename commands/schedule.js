const {
    SlashCommandBuilder
} = require('discord.js');
const common = require('../utils/common_modules');
const scheduleInfo = require('./schedules/schedule_info');
const scheduleMode = require('./schedules/schedule_mode');

const FILENAME = __filename.slice(__dirname.length + 1);


/**
 * Gets/Sets schedule information based on the args recieved.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function execute(args, client, message) {
    const command = args[0];
    if (command == '-mode') scheduleMode.setScheduleMode(args, client, message);
    else if (command === undefined) scheduleInfo.getScheduleInfo(client, message);
    else common.logAndSendError(common.responses['unknown_command'], FILENAME, message, common.responses['unknown_command']);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Checks which schedule command was called.'),
    execute
};