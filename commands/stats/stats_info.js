const {
    MessageEmbed
} = require('discord.js');
const optional_stats = require('./optional_stats');

/**
 * Sends the current DND stats.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function getStatsInfo(client, message) {
    let embed = new MessageEmbed()
        .setColor('#7289da')
        .setTimestamp()
        .setTitle('Stats');

    /**
     * Gets the default stat totals.
     */
    const statsDict = {
        'kills': ['kills', '🗡️', 'Kills'],
        'damageDealt': ['damageDealt', '⚔️', 'Damage Dealt'],
        'damageTaken': ['damageTaken', '🩹', 'Damage Taken'],
        'nat20': ['nat20', '🤩', 'Nat 20'],
        'nat1': ['nat1', '💩', 'Nat 1'],
        'ko': ['ko', '😴', 'KO'],
        'healing': ['healing', '🏨', 'Healing']
    };
    const statsTotals = await client.getStatsTotals();
    for (var sDKey in statsDict) {
        const stat = statsDict[sDKey][0];
        const emoji = statsDict[sDKey][1];
        const statFormated = statsDict[sDKey][2];
        const top = await client.getStatTopThree(stat);
        const formatted_top = arrayToString(top, stat, statsTotals[0][sDKey], false);
        embed.addField(`${emoji} ${statFormated}: ${statsTotals[0][sDKey]} ${emoji}`, `${formatted_top}`);
    }

    /**
     * Gets the optional stat totals, if there is any.
     */
    const optionalStatsDict = {};
    const optionalStatsTotals = await client.getOptionalStatsTotals();
    if (optionalStatsTotals.length > 0) {
        for (var stat in optionalStatsTotals) {
            const key = Object.keys(optionalStatsTotals[stat])[0];
            optionalStatsDict[key] = optional_stats[key];
        }

        for(var oSDKey in optionalStatsDict){
            const optionalStat = optionalStatsDict[oSDKey][0];
            const emoji = optionalStatsDict[oSDKey][1];
            const optionalStatFormated = optionalStatsDict[oSDKey][2];
            const top = await client.getOptionalStatTopThree(optionalStat);
            const formatted_top = arrayToString(top, optionalStat, optionalStatsTotals[0][oSDKey], true);
            embed.addField(`${emoji} ${optionalStatFormated}: ${optionalStatsTotals[0][oSDKey]} ${emoji}`, `${formatted_top}`);
        }
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
function arrayToString(arr, type, total, optional) {
    let str = '';
    arr.forEach(element => {
        const name = element.name;
        if(optional){
            element = element.optionalStats;
        }
        const avg = (element[type] / total) * 100;
        str += `${name}: ${element[type]} (${parseInt(avg)}%)\n`;
    });
    return str;
}