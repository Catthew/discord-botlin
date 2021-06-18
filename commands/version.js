const {
    MessageEmbed
} = require('discord.js');

exports.help = {
    name: 'version'
};

/**
 * Sends the current version of Botlin
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = (args, client, message) => {
    const dev = message.guild.members.cache.get(process.env.OWNER).user;
    let embed = new MessageEmbed()
        .setAuthor(dev.tag, dev.avatarURL())
        .setColor('#7289da')
        .setDescription('A goblin forced into being a Discord bot.')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setTitle('Botlin Version 1.2');
    message.channel.send(embed).catch(console.error);
};