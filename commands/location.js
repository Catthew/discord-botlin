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

    //TODO Error handling
    if(currentLocation == null){
        return;
    }

    let embed = new MessageEmbed()
        .setColor('#7289da')
        .setDescription(currentLocation['name'])
        .setTimestamp()
        .setTitle('The Current Location of Sionia and The Banshees: '); 
    message.channel.send(embed).catch(console.error);
};