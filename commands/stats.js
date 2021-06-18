const {
    MessageEmbed
} = require('discord.js');

exports.help = {
    name: 'stats'
};

/**
 * Sends the current DND stats.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    const statsDict = {
        'kills': ['kills', '🗡️', 'Kills'],
        'damageDealt': ['damageDealt', '⚔️', 'Damage Dealt'],
        'damageTaken': ['damageTaken', '🩹', 'Damage Taken'],
        'nat20': ['nat20', '🤩', 'Nat 20'],
        'nat1': ['nat1', '💩', 'Nat 1'],
        'redCoin': ['redCoin', '🔴', 'Red Coins'],
        'ko': ['ko', '😴', 'KO'],
        'healing': ['healing', '🏨', 'Healing']
    };

    const total = await client.getStatsTotals();

    let embed = new MessageEmbed()
        .setColor('#7289da')
        .setTimestamp()
        .setTitle('Stats');
    for (var key in statsDict) {
        let stat = statsDict[key][0];
        let emoji = statsDict[key][1];
        let statFormated = statsDict[key][2];
        let top = await client.getTop(stat);
        embed.addField(`${emoji} ${statFormated}: ${total[0][key]} ${emoji}`, `${arrayToString(top, stat, total[0][key])}`);
    }
    message.channel.send(embed).catch(console.error);
};

exports.tests = {
    arrayToString
};

/**
 * Formats the data array into a formatted string.
 * @param {Array.<String>} arr The array that contains the data to be turned into a String.
 * @param {String} type The name of the key needed to get the right data.
 * @returns {String} A formatted string with the data from the array.
 */
 function arrayToString(arr, type, total) {
    let str = '';
    arr.forEach(element => {
        let avg = (element[type] / total) * 100;
        str += `${element.name}: ${element[type]}`;
        str += type == 'damageDealt' ? ` (${parseInt(avg)}%)\n` : '\n';
    });
    return str;
}