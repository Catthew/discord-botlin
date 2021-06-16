const {
    MessageEmbed
} = require('discord.js');

exports.run = async (args, client, message) => {
    let cancelled = await client.getCancelled("");
    let date = cancelled.date;
    let isCancelled = cancelled.isCancelled;
    let location = cancelled.location;
    let embed = new MessageEmbed()
        .setTimestamp()
        .setTitle('Nat Up or Shut Up!');
    if (isCancelled) {
        embed.addField(`Cancelled for ${getDate(date)}`, 'You are safe for another week...').setColor('#ff0000');
    } else {
        embed.addField(`On for ${getDate(date)} at ${getTime(date)}`, `Get yourself to the ${location}`).setColor('#00b300');
        let schedule = await client.getSchedule();
        const scheduleDict = {
            'Drinks': ['🥛'],
            'Ice': ['🧊'],
            'Snacks': ['🍿']
        };
        for (var key in scheduleDict) {
            let type = scheduleDict[key][0];
            embed.addField(`${type} ${key} ${type}`, `${getScheduleName(schedule, key)}`);
        }
    }
    message.channel.send(embed).catch(console.error);
};

/**
 * Gets the Month and day.
 * @param {Date} date The DateTime object of the next DnD session.
 * @returns {String} The month name and the day.
 */
function getDate(date) {
    let month = date.toLocaleString('default', {
        month: 'long'
    });
    let day = date.getDate();
    return month + ' ' + day;
}

/**
 * Formats the data array into a formatted string.
 * @param {Array.<String>} schedule The array that contains the data to be turned into a String.
 * @param {String} type The name of the key needed to get the right data.
 * @returns {String}
 */
function getScheduleName(schedule, type) {
    let str = '';
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

exports.help = {
    name: 'schedule'
};

exports.tests = {
    getDate,
    getScheduleName,
    getTime
};