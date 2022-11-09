const {
    SlashCommandBuilder
} = require('discord.js');


async function execute(args, client, message) {
    if (args.length === 0) message.channel.send('Please actually type a request...').catch(console.error);
    else {
        const dev = await client.users.fetch(process.env.BOTOWNER);
        const response = args.join(' ');
        message.channel.send(`${dev}: ${response}`).catch(console.error);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('request')
        .setDescription('Pings the bot owner that someone has requested a feature in Botlin.'),
    execute
};