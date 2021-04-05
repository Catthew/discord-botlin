module.exports = (client, message) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(process.env.ACTIVITY);
};