const {
    RichEmbed
} = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
    name: 'meow'
};

/**
 * Sends a random picture of a cat.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    let meow = await fetch('https://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => json.file);
    message.channel.send(meow).catch(console.error);
};