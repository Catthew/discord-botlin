const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Sends the current version of Botlin.'),
    async execute(args, client, message) {
        const dev = await client.users.fetch(process.env.BOTOWNER);
        let embedBuilder = new EmbedBuilder()
            .setAuthor({ name: dev.tag, iconURL: dev.avatarURL() })
            .setColor('#7289da')
            .setDescription('A goblin forced into being a Discord bot.')
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setTitle(`Botlin Version ${process.env.VERSION}`);
        message.channel.send({
            embeds: [embedBuilder]
        }).catch(console.error);
    }
};