const responses = require('../../responses');

/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setScheduleTime(args, client, message) {
    const author = message.author.id;
    if(author !== process.env.BOTOWNER && author !== process.env.DM){
        message.channel.send(responses.access_denied).catch(console.error);
        return;
    }

    const session = await client.getSession();
    const sessionDateTime = session.date;

    const hoursMinutes = args[1].split(":");
    sessionDateTime.setHours(hoursMinutes[0]);
    sessionDateTime.setMinutes(hoursMinutes[1]);
    
    const setSession = await client.setSession(sessionDateTime);

    if (setSession['nModified'] == 0) {
        message.channel.send('Time was not updated.').catch(console.error);
    } else {
        message.channel.send('Time updated.').catch(console.error);
    }
}

module.exports = {
    setScheduleTime
};