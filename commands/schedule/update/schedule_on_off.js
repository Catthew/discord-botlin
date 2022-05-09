const common = require('../../../common_functions');
const info = require('../schedule_info');
const responses = require('../../../constants/responses');

/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setNewSchedule(args, client, message) {
    const filename = __filename.slice(__dirname.length + 1);

    let session;
    try {
        session = await client.getScheduleSession();
    } catch (error) {
        common.logAndSendError(error, filename, message, responses.schedule_not_updated);
        return;
    }

    if (session === null) common.logAndSendError(responses.schedule_error[0], filename, message, responses.schedule_not_updated);
    else {
        const cancelMapping = {
            off: true,
            on: false
        };

        const command = cancelMapping[args[1]];

        if (command == session.isOff) {
            common.logAndSendError(`The session is already ${args[1]}!`, filename, message, `The session is already ${args[1]}!`);
            return;
        }
        try {
            const setSession = await client.setScheduleSessionOnOff(command);
            if (setSession['modifiedCount'] == 0 || setSession === null) common.logAndSendError(responses.schedule_error[1], filename, message, responses.schedule_not_updated);
            else {
                message.channel.send(responses.schedule_updated).catch(console.error);
                info.getScheduleInfo(client, message);
            }
        } catch (error) {
            common.logAndSendError(error, filename, message, responses.schedule_not_updated);
        }

    }
}

module.exports = {
    setNewSchedule
};