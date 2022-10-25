require('dotenv-flow').config();
const {
  Client,
  Collection,
  GatewayIntentBits
} = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();
client.schedule = require('./cron_jobs')(client);

const handlerFiles = fs
  .readdirSync('./handlers')
  .filter((file) => file.endsWith('.js'));
for (const file of handlerFiles)
  require(`./handlers/${file}`)(client);

// TODO follow up below

require('./mongo/functions')(client);
client.mongoose = require('./mongo');
client.mongoose.init();

client.handleCommands();
client.handleEvents();
client.login(process.env.ACCESSTOKEN);