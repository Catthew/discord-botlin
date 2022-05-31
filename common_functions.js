const responses = require('./constants/responses');

/**
 * Checks to see if an admin made the command
 * @param {Discord.Message} message The message object that triggered this method.
 * @returns 
 */
function isAdmin(message) {
    const author = message.author.id;
    if (author !== process.env.BOTOWNER && author !== process.env.DM) {
        message.channel.send(responses['access_denied']).catch(console.error);
        return false;
    } else return true;
}

/**
 * Logs then sends the error that has occurred. 
 * @param {String} error The error that occurred.
 * @param {String} filename The name of the file the error occurred.
 * @param {Discord.Message} message The message object that triggered this method.
 * @param {String} response What is sent to Discord.
 */
function logAndSendError(error, filename, message, response) {
    console.log(filename + ': ' + error);
    if (message !== null) message.channel.send(response).catch(console.error);
}

module.exports = {
    isAdmin,
    logAndSendError
};