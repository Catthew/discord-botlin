const info = require('./schedule_info');
const modes = require('./utils/modes');
const common = require('../../utils/common_modules');

const FILENAME = __filename.slice(__dirname.length + 1);

/**
 * Sends the command to change the mode of the DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setScheduleMode(args, client, message) {
    try {
        const session = await client.getScheduleSession();
        if (session === null) common.logAndSendError(common.responses['schedule_error'][0], FILENAME, message, common.responses['schedule_error'][2]);
        else {
            const mode = args[1];
            const isOn = modes[mode];
            if (isOn === undefined) {
                common.logAndSendError(common.responses['schedule_error'][4], FILENAME, message, common.responses['schedule_error'][4]);
                return;
            }

            if (session.mode == mode) {
                common.logAndSendError(`${common.responses['schedule_error'][3]} ${mode} mode!`, FILENAME, message, `${common.responses['schedule_error'][3]} ${mode} mode!`);
                return;
            }

            let setSchedule;
            if (mode != 'temp') setSchedule = await client.setScheduleSessionMode(isOn, mode);
            else {
                const date = args.indexOf('-date', 1) + 1;
                const time = args.indexOf('-time', 1) + 1;
                let sessionDateTime = new Date(session.date.valueOf());

                if (time == 0 && date == 0) {
                    message.channel.send(common.responses['no_date_time']).catch(console.error);
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
                setSchedule = await client.setScheduleSessionModeTemp(sessionDateTime);
            }

            if (setSchedule['modifiedCount'] == 0 || setSchedule === null) common.logAndSendError(common.responses['schedule_error'][1], FILENAME, message, common.responses['schedule_error'][2]);
            else {
                message.channel.send(common.responses['schedule_updated']).catch(console.error);
                if (mode == 'cancel' || mode == 'normal' || mode == 'temp') info.getScheduleInfo(client, message);
            }
        }
    } catch (error) {
        common.logAndSendError(error, FILENAME, message, common.responses['schedule_error'][2]);
        return;
    }
}

module.exports = {
    setScheduleMode
};