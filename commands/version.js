const {
    MessageEmbed
} = require('discord.js');

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

exports.help = {
    name: 'version'
};