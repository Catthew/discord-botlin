const common = require('../../../common_functions');
const info = require('../schedule_info');
const responses = require('../../../constants/responses');
const schedule = require('../schedule');

const filename = __filename.slice(__dirname.length + 1);

/**
 * Sends the command to set the DnD Session on or off.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setScheduleSession(args, client, message) {
    toggleSschedule(client, message, args[2], 'session', 'The session');
}

/**
 * Sends the command to set Vacation mode for the DnD Session on or off.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setScheduleVacation(args, client, message) {
    toggleSschedule(client, message, args[2], 'vacation', 'Vacation mode');
}

/**
 * 

 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 * @param {String} toggleCommand The on off command.
 * @param {String} toggleType The type of setSession being run.
 * @param {String} toggleTypeError The correct start of an error for the type.
 * @returns 
 */
async function toggleSschedule(client, message, toggleCommand, toggleType, toggleTypeError) {
    try {
        const session = await schedule.getSchedule(client);
        if (session === null) common.logAndSendError(responses.schedule_error[0], filename, message, responses.schedule_error[2]);
        else {
            const cancelMapping = {
                off: true,
                on: false
            };
            const command = cancelMapping[toggleCommand];
            if ((command == session.isOff && toggleType == 'session') || (command == session.isVacation && toggleType == 'vacation')) {
                common.logAndSendError(`${toggleTypeError} is already ${toggleCommand}!`, filename, message, `${toggleTypeError} is already ${toggleCommand}!`);
                return;
            }
            const setSchedule = await schedule.setSchedule(client, command, toggleType);
            if (!setSchedule) common.logAndSendError(responses.schedule_error[1], filename, message, responses.schedule_error[2]);
            else {
                message.channel.send(responses.schedule_updated).catch(console.error);
                if (toggleType == 'session') info.getScheduleInfo(client, message);
            }
        }
    } catch (error) {
        common.logAndSendError(error, filename, message, responses.schedule_error[2]);
        return;
    }
}

module.exports = {
    setScheduleSession,
    setScheduleVacation
};