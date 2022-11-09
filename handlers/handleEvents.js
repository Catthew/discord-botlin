const { connection } = require('mongoose');
const fs = require('fs');

module.exports = client => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync('./events');
        for (const folder of eventFolders) {
            const eventFiles = fs
                .readdirSync(`./events/${folder}`)
                .filter((file) => file.endsWith('.js'));
            switch (folder) {
                case 'client':
                    for (const file of eventFiles) {
                        const event = require(`../events/client/${file}`);
                        if (event.once) client.once(event.name, (m) => event.execute(client, m));
                        else client.on(event.name, (m) => event.execute(client, m));
                    }
                    break;
                case 'mongo':
                    for (const file of eventFiles) {
                        const event = require(`../events/mongo/${file}`);
                        if (event.once) connection.once(event.name, (m) => event.execute(client, m));
                        else connection.on(event.name, (m) => event.execute(client, m));
                    }
                    break;
            }
        }
    };
};