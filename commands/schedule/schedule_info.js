const {
    MessageEmbed
} = require('discord.js');
const responses = require('../../constants/responses');

/**
 * Sends the current DND schedule for the week.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function getScheduleInfo(client, message) {
    const session = await client.getSession();
    const date = session.date;
    const isOff = session.isOff;
    const location = session.location;
    const locationDetails = session.locationDetails;
    let embed = new MessageEmbed()
        .setTimestamp()
        .setTitle('Nat Up or Shut Up!');
    if (isOff) embed.addField(`Cancelled for ${getDate(date)}`, responses.schedule_canceled).setColor('#ff0000');
    else {
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