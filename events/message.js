const responses = require('../responses');

module.exports = (client, message) => {
    const prefix = process.env.PREFIX;

    if (message.author.bot) {
        const commands = require('./message/bot_commands');
        
        let current_message = new String(message.content).trim();

        if(!current_message.includes(prefix)) return;

        let current_command = current_message.replace(`${prefix} `, '');

        if(!commands.allowed_commands.includes(current_command)){
            console.log('The bot tried to do a command that it is not allowed.');
            return;
        }
    }

    if (message.content.includes(client.user.id)) message.channel.send(responses.bot_no_command);
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (command == '') {
        message.channel.send(responses.no_command).catch(console.error);
        return;
    }

    const cmd = client.commands.get(command);
    if (!cmd) {
        message.channel.send(responses.unknown_command).catch(console.error);
        return;
    }

    cmd.run(args, client, message);
};