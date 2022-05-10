const {
    MessageEmbed
} = require('discord.js');
const common = require('../../common_functions');
const optional_stats = require('../../constants/optional_stats');
const responses = require('../../constants/responses');
const filename = __filename.slice(__dirname.length + 1);

/**
 * Sends the current DND stats.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
async function getStatsInfo(client, message) {
    let statsTotals;
    try {
        statsTotals = await client.getStatsTotals();
    } catch (error) {
        common.logAndSendError(error, filename, message, responses.stats_error[2]);
        return;
    }

    if (statsTotals === null) common.logAndSendError(responses.stats_error[0], filename, message, responses.stats_not_updated);
    else {
        let embed = new MessageEmbed()
            .setColor('#7289da')
            .setTimestamp()
            .setTitle('Stats');

        const statsDict = {
            'kills': ['kills', '🗡️', 'Kills'],
            'damageDealt': ['damageDealt', '⚔️', 'Damage Dealt'],
            'damageTaken': ['damageTaken', '🩹', 'Damage Taken'],
            'nat20s': ['nat20s', '🤩', 'Nat 20\'s'],
            'nat1s': ['nat1s', '💩', 'Nat 1\'s'],
            'knockedOut': ['knockedOut', '😴', 'Knocked Out'],
            'healing': ['healing', '🏨', 'Healing']
        };
        
        for (var sDKey in statsDict) {
            const stat = statsDict[sDKey][0];
            const emoji = statsDict[sDKey][1];
            const statFormated = statsDict[sDKey][2];
            let top;
            try {
                top = await client.getStatTopThree(stat);
                const formatted_top = arrayToString(top, stat, statsTotals[0][sDKey], false);
                embed.addField(`${emoji} ${statFormated}: ${statsTotals[0][sDKey]} ${emoji}`, `${formatted_top}`);
            } catch (error) {
                common.logAndSendError(error, filename, message, responses.stats_not_updated);
                return;
            }
        }

        /**
         * Gets the optional stat totals, if there is any.
         */
        let optionalStatsTotals;
        try {
            let optionalStatsDict = {};
            optionalStatsTotals = await client.getOptionalStatsTotals();
            if (optionalStatsTotals.length > 0) {
                for (var stat in optionalStatsTotals) {
                    const key = Object.keys(optionalStatsTotals[stat])[0];
                    optionalStatsDict[key] = optional_stats[key];
                }

                for (var oSDKey in optionalStatsDict) {
                    const optionalStat = optionalStatsDict[oSDKey][0];
                    const emoji = optionalStatsDict[oSDKey][1];
                    const optionalStatFormated = optionalStatsDict[oSDKey][2];

                    let optionalTop;
                    try {
                        optionalTop = await client.getOptionalStatTopThree(optionalStat);
                        const formatted_top = arrayToString(optionalTop, optionalStat, optionalStatsTotals[0][oSDKey], true);
                        embed.addField(`${emoji} ${optionalStatFormated}: ${optionalStatsTotals[0][oSDKey]} ${emoji}`, `${formatted_top}`);
                    } catch (error) {
                        common.logAndSendError(error, filename, message, responses.stats_not_updated);
                        return;
                    }
                }
            }
        } catch (error) {
            common.logAndSendError(error, filename, message, responses.stats_not_updated);
            return;
        }

        message.channel.send({
            embeds: [embed]
        }).catch(console.error);
    }
}

module.exports = {
    arrayToString,
    getStatsInfo
};

/**
 * Formats the data array into a formatted string.
 * @param {Array.<String>} arr The array that contains the data to be turned into a String.
 * @param {String} type The name of the key needed to get the right data.
 * @param {Number} total The total count of the stat.
 * @param {Boolean} optional If the stat being used is an optional stat.
 * @returns {String} A formatted string with the data from the array.
 */
function arrayToString(arr, type, total, optional) {
    let str = '';
    arr.forEach(element => {
        const name = element.name;
        if (optional) element = element.optionalStats;
        const avg = (total == 0) ? 0 : (element[type] / total) * 100;
        str += `${name}: ${element[type]} (${parseInt(avg)}%)\n`;
    });
    return str;
}