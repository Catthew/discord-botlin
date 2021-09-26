const responses = require('../responses');

module.exports = async (client, oldMember, newMember) => {
    if (newMember.userID == process.env.OTHERBOT && newMember.status == 'offline'){
        const dev = await client.users.fetch(process.env.OWNER);
        client.channels.cache.get(process.env.BOTLINCHANNEL).send(`${dev}: ${responses.disconnected}`).catch(console.error);
      }
};