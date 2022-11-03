require('dotenv-flow').config();
const {
  Client,
  Collection,
  GatewayIntentBits
} = require('discord.js');
const { connect } = require('mongoose');
const fs = require('fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

const handlerFiles = fs
  .readdirSync('./handlers')
  .filter((file) => file.endsWith('.js'));
for (const file of handlerFiles)
  require(`./handlers/${file}`)(client);

client.handleCommands();
client.handleEvents();
client.handleMongo();

client.schedule = require('./cron')(client);

client.login(process.env.ACCESSTOKEN);

(async () => {
  await connect(process.env.MONGOTOKEN).catch(console.error)
})();