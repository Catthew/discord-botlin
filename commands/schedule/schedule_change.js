const responses = require('../../responses');

/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function setNewSchedule(args, client, message) {
    const author = message.author.id;
    if(author !== process.env.BOTOWNER && author !== process.env.DM){
        message.channel.send(responses.access_denied).catch(console.error);
        return;
    }
    const cancelMapping = {
        cancel: true,
        uncancel: false
    };

    const session = await client.getSession();
    const isCancelled = session.isCancelled;

    const command = args[0];

    if (cancelMapping[command] == undefined){
        message.channel.send(responses.unknown_command).catch(console.error);
        return;
    } 

    if(cancelMapping[command] == isCancelled){
        message.channel.send(`${responses.already_cancelled} ${command}ed.`).catch(console.error);
        return;
    }
    
    const updated = await client.setCancelled(cancelMapping[command]);

    if(updated !== null) {
        message.channel.send(`${responses.schedule_updated} ${command}ed.`).catch(console.error);
    } else {
        message.channel.send(`${responses.schedule_not_updated} ${command}ed.`).catch(console.error);
    }
}

module.exports = {
    setNewSchedule
};