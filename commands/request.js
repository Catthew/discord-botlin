exports.run = async (args, client, message) => {
    if (args.length === 0) {
        message.channel.send('Please actually type a request...').catch(console.error);
    } else {
        const dev = await message.guild.members.fetch(client.config.owner);
        const response = args.join(' ');
        message.channel.send(`${dev}: ${response}`).catch(console.error);
    }
};

exports.help = {
    name: 'request'
};