const {
    MessageEmbed
} = require('discord.js');
const common = require('../../common_functions');
const responses = require('../../constants/responses');

/**
 * Sends the current DND schedule for the week.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function getScheduleInfo(client, message) {
    const filename = __filename.slice(__dirname.length + 1);

    let session;
    try {
        session = await client.getScheduleSession();
    } catch (error) {
        common.logAndSendError(error, filename, message, responses.schedule_not_updated);
        return;
    }

    if (session === null) common.logAndSendError(responses.schedule_error[0], filename, message, responses.schedule_not_updated);
    else {
        const date = session.date;
        let embed = new MessageEmbed()
            .setTimestamp()
            .setTitle('Nat Up or Shut Up!');

        if (session.isOff) embed.addField(`Cancelled for ${getDate(date)}`, responses.schedule_canceled).setColor('#ff0000');
        else {
            const location = session.location;
            const locationDetails = session.locationDetails;
            let details = '';
            if (locationDetails.length > 0) {
                details = '\n |';
                for (var i in locationDetails) details += ' ' + locationDetails[i] + ' |';
            }
            embed.addField(`On for ${getDate(date)} at ${getTime(date)}`, `${location} ${details}`).setColor('#00b300');
        }
        message.channel.send({
            embeds: [embed]
        }).catch(console.error);
    }
}

module.exports = {
    getScheduleInfo,
    getDate,
    getTime
};

/**
 * Gets the Month and day.
 * @param {Date} date The DateTime object of the next DnD session.
 * @returns {String} The month name and the day.
 */
function getDate(date) {
    const month = date.toLocaleString('default', {
        month: 'long'
    });
    const day = date.getDate();
    return month + ' ' + day;
}

/**
 * Gets the Time.
 * @param {Date} date The DateTime object of the next DnD session.
 * @returns {String} The time of the session.
 */
function getTime(date) {
    return date.toLocaleString('default', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'America/New_York'
    });
}