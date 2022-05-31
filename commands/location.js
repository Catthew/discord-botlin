const {
    MessageEmbed
} = require('discord.js');
const common = require('../common_functions');
const responses = require('../constants/responses');

const filename = __filename.slice(__dirname.length + 1);

/**
 * Sends the current version of Botlin.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    let currentLocation;
    try {
        currentLocation = await client.getCurrentLocation();
    } catch (error) {
        common.logAndSendError(error, filename, message, responses['info_error'][1]);
        return;
    }
    if (currentLocation === null) message.channel.send(responses['info_error'][1]).catch(console.error);
    else {
        const embed = new MessageEmbed()
            .setColor('#7289da')
            .setDescription(currentLocation['name'])
            .setTimestamp()
            .setTitle(`The Current Location of ${process.env.TEAMNAME}: `);
        message.channel.send({
            embeds: [embed]
        }).catch(console.error);
    }
};