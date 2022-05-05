const {
    parse
} = require("dotenv-flow");

/**
 * Updates the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = async (client) => {
    const scheduleSession = await client.getSession();
    const today = new Date();
    const days = {
        'Friday': 6,
        'Saturday': 7
    };
    const time = scheduleSession.defaultTime.split(":").map(function (item) {
        return parseInt(item, 10);
    });
    const nextSession = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days[scheduleSession.defaultDay], time[0], time[1], 0, 0);
    const setSession = await client.setSession(scheduleSession._id, nextSession);
    if (setSession['modifiedCount'] == 0) {
        console.log(`Error. Update to the Session date failed.`);
        return;
    }
};