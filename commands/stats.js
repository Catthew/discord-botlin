const {
    MessageEmbed
} = require('discord.js');

exports.run = async (args, client, message) => {
    const topDamageDealt = await client.getTop('damageDealt');
    const topDamageTaken = await client.getTop('damageTaken');
    const topKills = await client.getTop('kills');
    const topNat1 = await client.getTop('nat1');
    const topNat20 = await client.getTop('nat20');
    let embed = new MessageEmbed()
        .addField('🗡️Top Kills🗡️', `${arrayToString(topKills, 'kills')}`)
        .addField('⚔️Top Damage Dealt⚔️', `${arrayToString(topDamageDealt, 'damageDealt')}`)
        .addField('🩹Top Damage Taken🩹', `${arrayToString(topDamageTaken, 'damageTaken')}`)
        .addField('🤩Top Nat 20🤩', `${arrayToString(topNat20, 'nat20')}`)
        .addField('💩Top Nat 1💩', `${arrayToString(topNat1, 'nat1')}`)
        .setColor('#7289da')
        .setTimestamp()
        .setTitle('Stats');
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