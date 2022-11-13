const common = require('../../utils/common_modules');


/**
 * Reads the message sent by the user and maps it to the correct response.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function execute(client, message) {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == '') {
        message.reply(common.responses['no_command']).catch(console.error);
        return;
    }

    if (message.author.bot) {
        const bot_commands = require('../utils/bot_commands');
        if (!bot_commands.allowed_commands.includes(command)) {
            console.log('The bot tried to do a command that it is not allowed.');
            return;
        }
    }

    if (message.content.includes(client.user.id)) message.reply(common.responses['bot_at']).catch(console.error);

    const cmd = client.commands.get(command);
    if (cmd) cmd.execute(args, client, message);
    else {
        message.reply(common.responses['unknown_command']).catch(console.error);
        return;
    }
}

module.exports = {
    name: "messageCreate",
    execute
};