const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync('./events');
        for (const folder of eventFolders) {
            const eventFiles = fs
                .readdirSync(`./events/${folder}`)
                .filter((file) => file.endsWith('.js'));
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (m) => event.execute(client, m));
                        else client.on(event.name, (m) => event.execute(client, m));
                    }
                    break;
            }
        }
    };
};