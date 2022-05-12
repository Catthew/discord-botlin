const common = require('../common_functions');
const responses = require('../constants/responses');
const schedule = require('../commands/schedule/schedule');

const filename = __filename.slice(__dirname.length + 1);

/**
 * Updates the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = async (client) => {
    try {
        const session = await schedule.getSchedule(client);
        if (session === null) common.logAndSendError(responses.schedule_error[0], filename, null, null);
        else {
            const today = new Date();
            const days = {
                'Friday': 4,
                'Saturday': 5
            };
            const time = session.defaultTime.split(":").map(function (item) {
                return parseInt(item, 10);
            });
            
            const nextSession = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days[session.defaultDay], time[0], time[1], 0, 0);

            const setSchedule = await schedule.setSchedule(client, [nextSession, !session.isVacation], 'nextSession');
            if (!setSchedule) common.logAndSendError(responses.schedule_error[1], filename, null, null);
        }
    } catch (error) {
        common.logAndSendError(error, filename, null, null);
        return;
    }
};