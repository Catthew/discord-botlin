const {
    RichEmbed
} = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (args, client, message) => {
    let doggo = await fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(json => json.message);
    message.channel.send(doggo).catch(console.error);
};

exports.help = {
    name: 'doggo'
};