/**
 * Returns the information sent when the bot it ready.
 * @param {Discord.Client} client The client instance of the bot.
 */
async function execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(process.env.ACTIVITY);
}

module.exports = {
    name: 'ready',
    once: true, 
    execute
};