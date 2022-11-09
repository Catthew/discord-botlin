const {
    SlashCommandBuilder
} = require('discord.js');
const { Common, Responses } = require('../utils');
const scheduleInfo = require('./schedules/schedule_info');
const scheduleMode = require('./schedules/schedule_mode');

const FILENAME = __filename.slice(__dirname.length + 1);


async function execute(args, client, message) {
    const command = args[0];
    if (command == '-mode') scheduleMode.setScheduleMode(args, client, message);
    else if (command === undefined) scheduleInfo.getScheduleInfo(client, message);
    else Common.logAndSendError(Responses['unknown_command'], FILENAME, message, Responses['unknown_command']);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Checks which schedule command was called.'),
    execute
};