const responses = require('../../../constants/responses');
const info = require('../schedule_info');

/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setNewSchedule(args, client, message) {
    const cancelMapping = {
        cancel: true,
        uncancel: false
    };

    const session = await client.getSession();
    const isCancelled = session.isCancelled;

    const command = args[0];

    if (cancelMapping[command] === undefined){
        message.channel.send(responses.unknown_command).catch(console.error);
        return;
    } 

    if(cancelMapping[command] == isCancelled){
        message.channel.send(`The session is already ${command}ed.`).catch(console.error);
        return;
    }
    
    const updated = await client.setCancelled(cancelMapping[command]);

    if(updated === null) {
        message.channel.send(responses.schedule_not_updated).catch(console.error);
        return;
    }

    message.channel.send(responses.schedule_updated).catch(console.error);
    info.getScheduleInfo(client, message);
}

module.exports = {
    setNewSchedule
};