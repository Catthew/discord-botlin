const { Responses } = require('../../utils/constants');

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        const prefix = process.env.PREFIX;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command == '') {
            message.reply(Responses['no_command'])
                .catch(console.error);
            return;
        }

        if (message.author.bot) {
            const bot_commands = require('../utils/bot_commands');
            if (!bot_commands.allowed_commands.includes(command)) {
                console.log('The bot tried to do a command that it is not allowed.');
                return;
            }
        }

        if (message.content.includes(client.user.id)) message.reply(Responses['bot_at']).catch(console.error);

        const cmd = client.commands.get(command);
        if (cmd) cmd.execute(args, client, message);
        else {
            message.reply(Responses['unknown_command'])
                .catch(console.error);
            return;
        }

        
    }
};