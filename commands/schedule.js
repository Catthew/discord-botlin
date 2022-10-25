const {
    SlashCommandBuilder
} = require('discord.js');
const common = require('../utils/common_functions');
const scheduleInfo = require('./schedules/schedule_info');
const scheduleMode = require('./schedules/schedule_mode');
const responses = require('../utils/constants/responses');

const filename = __filename.slice(__dirname.length + 1);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Checks which schedule command was called.'),
    async execute(args, client, message) {
        const command = args[0];
        if (command == '-mode') scheduleMode.setScheduleMode(args, client, message);
        else if (command === undefined) scheduleInfo.getScheduleInfo(client, message);
        else common.logAndSendError(responses['unknown_command'], filename, message, responses['unknown_command']);
    }
};