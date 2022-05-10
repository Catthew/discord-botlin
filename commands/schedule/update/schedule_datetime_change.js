const common = require('../../../common_functions');
const info = require('../schedule_info');
const responses = require('../../../constants/responses');

/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setScheduleDateTime(args, client, message) {
    const filename = __filename.slice(__dirname.length + 1);

    const date = args.indexOf('--date', 1) + 1;
    const time = args.indexOf('--time', 1) + 1;
    let session;
    try {
        session = await client.getScheduleSession();
    } catch (error) {
        common.logAndSendError(error, filename, message, responses.schedule_error[0]);
        return;
    }

    if (session === null) common.logAndSendError(responses.schedule_error[0], filename, message, responses.schedule_not_updated);
    else {
        let sessionDateTime = new Date(session.date.valueOf());

        if (time == 0 && date == 0) {
            message.channel.send(responses.no_date_time).catch(console.error);
            return;
        }

        if (time > 0) {
            const hoursMinutes = args[time].split(":");
            sessionDateTime.setHours(hoursMinutes[0]);
            sessionDateTime.setMinutes(hoursMinutes[1]);
            if (sessionDateTime.getDate() != session.date.getDate()) sessionDateTime.setDate(session.date.getDate());
        }

        if (date > 0) {
            const newSessionDate = new Date(args[date]);
            sessionDateTime.setMonth(newSessionDate.getMonth());
            sessionDateTime.setDate(newSessionDate.getDate());
            sessionDateTime.setFullYear(newSessionDate.getFullYear());
        }

        try {
            const setSession = await client.setScheduleSession(session._id, sessionDateTime);
            if (setSession['modifiedCount'] == 0 || setSession === null) common.logAndSendError(responses.schedule_error[1], filename, message, responses.schedule_not_updated);
            else {
                message.channel.send(`${responses.schedule_updated}`).catch(console.error);
                info.getScheduleInfo(client, message);
            }
        } catch (error) {
            common.logAndSendError(error, filename, message, responses.schedule_not_updated);
            return;
        }
    }
}

module.exports = {
    setScheduleDateTime
};