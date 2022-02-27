const responses = require('./responses');

/**
 * Checks to see if an admin made the command
 * @param {Discord.Message} message The message object that triggered this method.
 * @returns 
 */
function isAdmin(message) {
    const author = message.author.id;
    if(author !== process.env.BOTOWNER && author !== process.env.DM){
        message.channel.send(responses.access_denied).catch(console.error);
        return false;
    } else {
        return true;
    }

}

module.exports = {
    isAdmin
};