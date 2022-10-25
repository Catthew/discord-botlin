const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFiles = fs
            .readdirSync('./commands')
            .filter((file) => file.endsWith('.js'));
        const { commands, commandArray } = client
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.set(command.data.name, command);
        }
    };
};