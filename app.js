const {
  Client,
  Collection
} = require('discord.js');
const client = new Client();
const fs = require('fs');

require('dotenv-flow').config();
require('./utils/functions')(client);

client.commands = new Collection();
client.mongoose = require('./utils');
client.schedule = require('./cron_jobs')(client);

fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split('.')[0];
    client.commands.set(cmdName, props);
  });
});

client.on('message', require('./events/message').bind(null, client));
client.on('ready', require('./events/ready').bind(null, client));

client.mongoose.init();
client.login(process.env.TOKEN);