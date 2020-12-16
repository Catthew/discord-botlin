const {
    MessageEmbed
} = require('discord.js');

exports.run = async (args, client, message) => {
    
    let schedule = await client.getSchedule("");
    const scheduleDict = {
        'Drinks': ['🥛'],
        'Ice': ['🧊'],
        'Snacks': ['🍿']
    };
    let embed = new MessageEmbed()
        .setColor('#7289da')
        .setTimestamp()
        .setTitle('Schedule');
    for (var key in scheduleDict) {
        let type = scheduleDict[key][0];
        embed.addField(`${type} ${key} ${type}`, `${getScheduleName(schedule, key)}`);
    }
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'schedule'
};

/**
 * Formats the data array into a formatted string.
 * @param {Array} arr   The array that contains the data to be turned into a String.
 * @param {String} type The name of the key needed to get the right data.
 */
function getScheduleName(schedule, type) {
    let str = '';
    schedule.forEach(element => {
        if (element.type == type){
            str = element.name;
        }
    });
    return str;
}

exports.tests = {
    getScheduleName
};