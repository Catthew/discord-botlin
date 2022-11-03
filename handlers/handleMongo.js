const fs = require('fs');

module.exports = (client) => {
    client.handleMongo = async () => {
        const commandFiles = fs
            .readdirSync('./mongo/modules')
            .filter((file) => file.endsWith('.js'));
        const { commands } = client
        for (const file of commandFiles) {
            require(`../mongo/modules/${file}`)(client);
        }
    };
};