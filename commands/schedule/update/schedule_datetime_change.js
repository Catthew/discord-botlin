const responses = require('../../../constants/responses');
const info = require('../schedule_info');

/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setScheduleDateTime(args, client, message) {

    const date = args.indexOf('--date', 2) + 1;
    const time = args.indexOf('--time', 2) + 1;
    const session = await client.getSession();
    let sessionDateTime = new Date(session.date.valueOf());

    if (time == 0 && date == 0) {
        message.channel.send(responses.no_date_time).catch(console.error);
        return;
    }
    
    if(time > 0) {
        const hoursMinutes = args[time].split(":");
        const newHour = serverOffset(Number(hoursMinutes[0]));
        sessionDateTime.setHours(newHour);
        sessionDateTime.setMinutes(hoursMinutes[1]);
        if (sessionDateTime.getDate() != session.date.getDate()) sessionDateTime.setDate(session.date.getDate());
    }

    if (date > 0) {
        const newSessionDate = new Date(args[date]);
        sessionDateTime.setMonth(newSessionDate.getMonth());
        sessionDateTime.setDate(newSessionDate.getDate());
        sessionDateTime.setFullYear(newSessionDate.getFullYear());
    }

    const setSession = await client.setSession(session._id, sessionDateTime);

    if (setSession['nModified'] == 0) {
        message.channel.send('Time was not updated.').catch(console.error);
        return;
    }

    message.channel.send(`${responses.schedule_updated}`).catch(console.error);
    info.getScheduleInfo(client, message);
}

module.exports = {
    setScheduleDateTime,
    serverOffset
};

/**
 * Adds the time for the VPS
 * @param {Number} hours The hours entered in.
 * @returns The hours + 4.
 */
function serverOffset(hours){
    let newHours = hours + 4;
    return newHours > 24 ? newHours - 24 : newHours;
}

