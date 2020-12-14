const {
    MessageEmbed
} = require('discord.js');

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
    let embed = new MessageEmbed()
        .setColor('#7289da')
        .setTimestamp()
        .setTitle('Stats');
    for (var key in statsDict) {
        let stat = statsDict[key][0];
        let emoji = statsDict[key][1];
        let statFormated = statsDict[key][2];
        let top = await client.getTop(stat);
        embed.addField(`${emoji}Top ${statFormated}${emoji}`, `${arrayToString(top, stat)}`);
    }
    message.channel.send(embed).catch(console.error);
};

exports.help = {
    name: 'stats'
};

/**
 * Formats the data array into a formatted string.
 * @param {Array} arr   The array that contains the data to be turned into a String.
 * @param {String} type The name of the key needed to get the right data.
 */
function arrayToString(arr, type) {
    let str = '';
    arr.forEach(element => {
        str += element.name + ': ' + element[type] + '\n';
    });
    return str;
}

exports.tests = {
    arrayToString
};