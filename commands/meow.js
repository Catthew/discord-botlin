const {
    RichEmbed
} = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (args, client, message) => {
    let meow = await fetch('https://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => json.file);
    message.channel.send(meow).catch(console.error);
};

exports.help = {
    name: 'meow'
};