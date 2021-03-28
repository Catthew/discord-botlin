const {
  Client,
  Collection
} = require('discord.js');
const client = new Client();
const fs = require('fs');

require('./utils/functions')(client);

client.config = require('./config');
client.commands = new Collection();
client.mongoose = require('./utils');
client.schedule = require('./cron_jobs/schedule')(client);

fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split('.')[0];
    client.commands.set(cmdName, props);
  });
});

fs.readdir('./events/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    client.on(evtName, evt.bind(null, client));
  });
});

client.mongoose.init();
client.login(client.config.token);