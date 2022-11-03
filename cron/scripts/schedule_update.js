const common = require('../../common_functions');
const modes = require('../../constants/modes');
const responses = require('../../constants/responses');

const filename = __filename.slice(__dirname.length + 1);

/**
 * Updates the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = async (client) => {
    try {
        const session = await client.getScheduleSession();
        if (session === null) common.logAndSendError(responses['schedule_error'][0], filename, null, null);
        else {
            const time = session.defaultTime.split(":").map(function (item) {
                return parseInt(item, 10);
            });

            const today = new Date();
            const nextSession = new Date(today.getFullYear(), today.getMonth(), today.getDate() + session.defaultDay, time[0], time[1], 0, 0);

            console.log(nextSession);
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

            if (setScheduleSession['modifiedCount'] == 0 || setScheduleSession === null) common.logAndSendError(responses['schedule_error'][1], filename, null, null);
        }
    } catch (error) {
        common.logAndSendError(error, filename, null, null);
        return;
    }
};