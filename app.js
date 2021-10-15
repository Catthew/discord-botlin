const {
  Client,
  Collection
} = require('discord.js');
const client = new Client();
const fs = require('fs');

require('dotenv-flow').config();
require('./mongo/functions')(client);

client.commands = new Collection();
client.mongoose = require('./mongo');
client.schedule = require('./cron_jobs')(client);

fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const props = require(`./commands/${file}`);
    const cmdName = file.split('.')[0];
    client.commands.set(cmdName, props);
  });
});

fs.readdir('./events/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    const evtName = file.split('.')[0];
    client.on(evtName, evt.bind(null, client));
  });
});

client.mongoose.init();
client.login(process.env.ACCESSTOKEN);