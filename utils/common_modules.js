const RESPONSES = {
    access_denied: 'You do not have permission to make that command.',
    bot_at: 'Type gobo! to use me',
    info_error: ['Info is null', 'Error: Nothing was found.'],
    invalidCommandValue: ['Invalid Command Value', 'Please enter a valid command value.'],
    no_command: 'Please enter a command.',
    no_date_time: 'Please enter a date and/or time.',
    schedule_canceled: 'You are safe for another week...',
    schedule_error: ['Schedule is null', 'Schedule not modified', 'Error: The schedule hasn\'t been updated.', 'The session is already in', 'Invalid Mode.'],
    schedule_updated: 'The schedule has been updated.',
    stats_error: ['Stats is null', 'Stats not modified', 'Error: The stats hasn\'t been updated.'],
    unknown_command: 'I do not know this command.'
}

/**
 * Checks to see if an admin made the command
 * @param {Discord.Message} message The message object that triggered this method.
 * @returns 
 */
function isAdmin(message) {
    const author = message.author.id;
    if (author !== process.env.BOTOWNER && author !== process.env.DM) {
        message.channel.send(common.responses['access_denied']).catch(console.error);
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
    logAndSendError,
    responses: RESPONSES
};