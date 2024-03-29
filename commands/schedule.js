const {
    MessageEmbed
} = require('discord.js');

exports.help = {
    name: 'schedule'
};

/**
 * Sends the current DND schedule for the week.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    const cancelled = await client.getCancelled("");
    const date = cancelled.date;
    const isCancelled = cancelled.isCancelled;
    const location = cancelled.location;
    let embed = new MessageEmbed()
        .setTimestamp()
        .setTitle('Nat Up or Shut Up!');
    if (isCancelled) {
        embed.addField(`Cancelled for ${getDate(date)}`, 'You are safe for another week...').setColor('#ff0000');
    } else {
        embed.addField(`On for ${getDate(date)} at ${getTime(date)}`, `Get yourself to the ${location}`).setColor('#00b300');
        const schedule = await client.getSchedule();
        const scheduleDict = {
            'Drinks': ['🥛'],
            'Ice': ['🧊']
        };
        for (var key in scheduleDict) {
            const type = scheduleDict[key][0];
            const scheduleName = getScheduleName(schedule, key);
            if (scheduleName !== undefined) {
                embed.addField(`${type} ${key} ${type}`, `${scheduleName}`);
            } else {
                message.channel.send('I am a bit confused right now.').catch(console.error);
                return;
            }
        }
    }
    message.channel.send(embed).catch(console.error);
};

exports.tests = {
    getDate,
    getScheduleName,
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
 * Formats the data array into a formatted string.
 * @param {Array.<String>} schedule The array that contains the data to be turned into a String.
 * @param {String} type The name of the key needed to get the right data.
 * @returns {String}
 */
function getScheduleName(schedule, type) {
    let str;
    schedule.forEach(element => {
        if (element.type == type) {
            str = element.name;
        }
    });
    return str;
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