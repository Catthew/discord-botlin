const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');
const common = require('../utils/common_modules');

const FILENAME = __filename.slice(__dirname.length + 1);


/**
 * Sends the current location the DND group is in.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function execute(args, client, message) {
    let currentLocation;
    try { currentLocation = await client.getCurrentLocation(); }
    catch (error) {
        common.logAndSendError(error, FILENAME, message, common.responses['info_error'][1]);
        return;
    }
    if (currentLocation === null) message.channel.send(common.responses['info_error'][1]).catch(console.error);
    else {
        const embedBuilder = new EmbedBuilder()
            .setColor('#7289da')
            .setDescription(currentLocation['name'])
            .setTimestamp()
            .setTitle(`Where is ${process.env.TEAMNAME}!? `);
        message.channel.send({
            embeds: [embedBuilder]
        }).catch(console.error);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('location')
        .setDescription('Sends current location of the group.'),
    execute
};