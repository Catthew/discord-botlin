module.exports = (client, message) => {
    if (message.author.bot) {
        let current_message = new String(message.content).trim();
        const allowed_commands = (`${process.env.PREFIX} schedule`, `${process.env.PREFIX} stats`);
        if(!allowed_commands.includes(current_message)){
            return;
        }
    }

    if (message.content.includes(client.user.id)) message.channel.send(process.env.AT);
    if (message.content.indexOf(process.env.PREFIX) !== 0) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(args, client, message);
};