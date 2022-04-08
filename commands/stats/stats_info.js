const {
    MessageEmbed
} = require('discord.js');

/**
 * Sends the current DND stats.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
 async function getStatsInfo(client, message) {
    const statsDict = {
        'kills': ['kills', '🗡️', 'Kills'],
        'damageDealt': ['damageDealt', '⚔️', 'Damage Dealt'],
        'damageTaken': ['damageTaken', '🩹', 'Damage Taken'],
        'nat20': ['nat20', '🤩', 'Nat 20'],
        'nat1': ['nat1', '💩', 'Nat 1'],
        'ko': ['ko', '😴', 'KO'],
        'healing': ['healing', '🏨', 'Healing']
    };
    let total;
    switch (process.env.MONGODBUSER) {
        case 'Clarg':
        case 'Gobtana':
            total = await client.getStatsTotalsGobtana();
            break;
        case 'Botlin':
            statsDict['redCoin'] = ['redCoin', '🔴', 'Red Coins'];
            total = await client.getStatsTotalsBotlin();
            break;
        default:
            console.log('Error: Unknown user - excel_stats.js');
            return;
    }

    let embed = new MessageEmbed()
        .setColor('#7289da')
        .setTimestamp()
        .setTitle('Stats');
    for (var key in statsDict) {
        const stat = statsDict[key][0];
        const emoji = statsDict[key][1];
        const statFormated = statsDict[key][2];
        const top = await client.getTop(stat);
        const formatted_top = arrayToString(top, stat, total[0][key]);
        if (formatted_top !== undefined) embed.addField(`${emoji} ${statFormated}: ${total[0][key]} ${emoji}`, `${formatted_top}`);
        else message.channel.send('I am a bit confused right now.').catch(console.error);
    }
    message.channel.send({
        embeds: [embed]
    }).catch(console.error);
}

module.exports = {
    arrayToString,
    getStatsInfo
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
        const avg = (element[type] / total) * 100;
        str += `${element.name}: ${element[type]} (${parseInt(avg)}%)\n`;
    });
    return str;
}