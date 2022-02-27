const responses = require('../../responses');
const info = require('./schedule_info');
/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setScheduleTime(args, client, message) {
    const session = await client.getSession();
    const sessionDateTime = session.date;

    const hoursMinutes = args[1].split(":");
    const newHour = serverOffset(Number(hoursMinutes[0]));
    sessionDateTime.setHours(newHour);
    sessionDateTime.setMinutes(hoursMinutes[1]);
    
    const setSession = await client.setSession(sessionDateTime);

    if (setSession['nModified'] == 0) {
        message.channel.send('Time was not updated.').catch(console.error);
        return;
    }
    message.channel.send(`${responses.schedule_updated}`).catch(console.error);
    info.getScheduleInfo(client, message);
    
}

module.exports = {
    setScheduleTime,
    serverOffset
    
};

/**
 * Adds the time for the VPS
 * @param {Number} hours The hours entered in.
 * @returns The hours + 5.
 */
function serverOffset(hours){
    let newHours = hours + 5;
    return newHours > 24 ? newHours - 24 : newHours;
}