async function execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(process.env.ACTIVITY);
}

module.exports = {
    name: 'ready',
    once: true, 
    execute
};