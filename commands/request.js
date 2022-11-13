const {
    SlashCommandBuilder
} = require('discord.js');


/**
 * Sends a bot request to the bot creator.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
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