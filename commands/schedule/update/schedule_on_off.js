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
        off: true,
        on: false
    };

    const command = cancelMapping[args[1]];
    if (command === undefined) {
        message.channel.send(responses.unknown_command).catch(console.error);
        return;
    }

    const session = await client.getSession();
    if (command == session.isOff) {
        message.channel.send(`The session is already ${args[1]}!`).catch(console.error);
        return;
    }

    const updated = await client.setCancelled(command);
    if (updated === null) message.channel.send(responses.schedule_not_updated).catch(console.error);
    else {
        message.channel.send(responses.schedule_updated).catch(console.error);
        info.getScheduleInfo(client, message);
    }
}

module.exports = {
    setNewSchedule
};