const {
    RichEmbed
} = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
    name: 'doggo'
};

/**
 * Sends a random picture of a dog.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    let doggo = await fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(json => json.message);
    message.channel.send(doggo).catch(console.error);
};