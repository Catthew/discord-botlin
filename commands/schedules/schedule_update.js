const modes = require('./utils/modes');
const common = require('../../utils/common_modules');

const FILENAME = __filename.slice(__dirname.length + 1);

/**
 * Updates the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
async function scheduleUpdate(client) {
    try {
        const session = await client.getScheduleSession();
        if (session === null) common.logAndSendError(common.responses['schedule_error'][0], FILENAME, null, null);
        else {
            const time = session.defaultTime.split(":").map(function (item) {
                return parseInt(item, 10);
            });

            const today = new Date();
            const nextSession = new Date(today.getFullYear(), today.getMonth(), today.getDate() + session.defaultDay, time[0], time[1], 0, 0);

            let mode = session.mode;
            let isOn;
            if (mode == 'vacation') isOn = modes[mode];
            else if (mode == 'skip') {
                isOn = modes[mode];
                mode = 'normal';
            } else {
                isOn = true;
                mode = 'normal';
            }

            const setScheduleSession = client.setScheduleSession(isOn, mode, nextSession);

            if (setScheduleSession['modifiedCount'] == 0 || setScheduleSession === null) common.logAndSendError(common.responses['schedule_error'][1], FILENAME, null, null);
        }
    } catch (error) {
        common.logAndSendError(error, FILENAME, null, null);
        return;
    }
}

module.exports = {
    scheduleUpdate
};