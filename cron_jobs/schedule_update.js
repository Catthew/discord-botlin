const common = require('../common_functions');
const responses = require('../constants/responses');

/**
 * Updates the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = async (client) => {
    const filename = __filename.slice(__dirname.length + 1);

    let session;
    try {
        session = await client.getScheduleSession();
    } catch (error) {
        common.logAndSendError(error, filename, null, null);
        return;
    }

    if (session === null) common.logAndSendError(responses.schedule_error[0], filename, null, null);
    else {
        const today = new Date();
        const days = {
            'Friday': 6,
            'Saturday': 7
        };
        const time = session.defaultTime.split(":").map(function (item) {
            return parseInt(item, 10);
        });
        const nextSession = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days[session.defaultDay], time[0], time[1], 0, 0);
        try {
            const setSession = await client.setScheduleSession(session._id, nextSession);
            if (setSession['modifiedCount'] == 0 || setSession === null) common.logAndSendError(responses.schedule_error[1], filename, null, null);
        } catch (error) {
            common.logAndSendError(error, filename, null, null);
            return;
        }
        
    }
};