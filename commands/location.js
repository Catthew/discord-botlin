const {
    MessageEmbed
} = require('discord.js');

exports.help = {
    name: 'location'
};

/**
 * Sends the current version of Botlin
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    const currentLocation = await client.getCurrentLocation();
    if(currentLocation == null){
        message.channel.send('I am a bit confused right now.').catch(console.error);
        return;
    }

    const embed = new MessageEmbed()
        .setColor('#7289da')
        .setDescription(currentLocation['name'])
        .setTimestamp()
        .setTitle(`The Current Location of ${process.env.TEAMNAME}: `); 
    message.channel.send(embed).catch(console.error);
};