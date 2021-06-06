module.exports = (client, message) => {
    const prefix = process.env.PREFIX;
    if (message.author.bot) {
        let current_message = new String(message.content).trim();
        const allowed_commands = (`${prefix} schedule`, `${prefix} stats`);
        if(!allowed_commands.includes(current_message)){
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