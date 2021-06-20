module.exports = (client, message) => {
    const prefix = process.env.PREFIX;
    if (message.author.bot) {
        const commands = require('./bot_commands');
        let current_message = new String(message.content).trim();
        let current_command = current_message.replace(`${prefix} `, '');
        
        if(!commands.allowed_commands.includes(current_command)){
            return;
        }
    }

    if (message.content.includes(client.user.id)) message.channel.send(process.env.AT);
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(args, client, message);
};