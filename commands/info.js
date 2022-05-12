const {
    MessageEmbed
} = require('discord.js');
const common = require('../common_functions');
const responses = require('../constants/responses');

const filename = __filename.slice(__dirname.length + 1);
/**
 * Sends information about the thing that was asked.
 * @param {Array.<String>} args The message the user sent split into any array of words.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 */
exports.run = async (args, client, message) => {
    const response = capitalize(args.join(' '));
    let info;
    try {
        info = await searchForInfo(client, message, response);
    } catch (error) {
        common.logAndSendError(error, filename, message, responses.info_error[1]);
        return;
    }
    if (info === null) common.logAndSendError(responses.info_error[0], filename, message, responses.info_error[1]);
    else {
        let infoEmbed;
        let location;
        try {
            switch (info[1]) {
                case "Building":
                    infoEmbed = getBuilding(info[0]);
                    break;
                case "Character":
                    infoEmbed = getCharacter(info[0]);
                    break;
                case "Location":
                    location = await client.getLocationDetails(response);
                    infoEmbed = getLocation(info[0], location);
                    break;
                case "NPC":
                    infoEmbed = getNPC(info[0]);
                    break;
                default:
                    infoEmbed = 'Don\' rush me!';
                    break;
            }
        } catch (error) {
            common.logAndSendError(error, filename, message, responses.info_error[1]);
            return;
        }
        message.channel.send({
            embeds: [infoEmbed]
        }).catch(console.error);
    }
};

/**
 * Converts an array to a formatted String for the embed.
 * @param {Array.<String>} arr The array to be converted to a String
 * @returns {String} None if the array is empty, the array if there is only 1 item, or a string of comma seperated values.
 */
function arrayToString(arr) {
    if (!arr.length) return 'None';
    else if (arr.length < 2) return arr;
    else return arr.toString().split(',').join('\n');
}

/**
 * Capitalizes each word in a String.
 * @param {String} str The string that is going to be formatted.
 * @returns {String} The string with all the words capitalized.
 */
function capitalize(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Creates the embed for a Building.
 * @param {Building} info The collection of data from the database.
 * @returns {String} The MessageEmbed for buildings.
 */
function getBuilding(info) {
    return new MessageEmbed()
        .addField('Location', `${info.location}`)
        .addField('Owner', `${info.owner}`)
        .setColor('#7289da')
        .setDescription(info.type)
        .setTitle(info.name);
}

/**
 * Creates the embed for a character.
 * @param {Character} info Character data from the database.
 * @returns {String} The MessageEmbed for characters.
 */
function getCharacter(info) {
    const stats = `Kills: ${info.kills}\nDamage Dealt: ${info.damageDealt}\nDamage Taken: ${info.damageTaken}\nNat 20: ${info.nat20}\nNat 1: ${info.nat1}`;
    return new MessageEmbed()
        .addField('Class', `${info.class}`)
        .addField('Race', `${info.race}`)
        .addField('Stats', `${stats}`)
        .setColor('#7289da')
        .setDescription(info.bio)
        .setTitle(info.fullname);
}

/**
 * Creates the embed for a location.
 * @param {Location} info The Location data from the database.
 * @param {Array.<Array.<Map<String, String>>>} location The array of places with the speific location.
 * @returns {String} The MessageEmbed for locations.
 */
function getLocation(info, location) {
    let people = [];
    location[1].forEach(l => {
        people.push(l.fullname);
    });

    let stores = [];
    location[0].forEach(l => {
        stores.push(l.name);
    });
    const desc = splitMutlipleSentences(info.bio);
    return new MessageEmbed()
        .addField('Notable Citizens', `${arrayToString(people)}`)
        .addField('Notable Stores', `${arrayToString(stores)}`)
        .setColor('#7289da')
        .setDescription(desc)
        .setTitle(info.name);
}

/**
 * Creates the embed for a NPC.
 * @param {Object} info The collection of data from the database.
 * @returns {String} The MessageEmbed for NPCs.
 */
function getNPC(info) {
    const desc = splitMutlipleSentences(info.bio);
    return new MessageEmbed()
        .addField('Location', `${info.location}`)
        .addField('Race', `${info.race}`)
        .addField('Status', `${info.status}`)
        .setColor('#7289da')
        .setDescription(desc)
        .setTitle(info.fullname);
}

/**
 * Tries to retrieve the search term from the database.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 * @param {String} term The term the user is searching for.
 * @returns {?String} null if not found, or an array of the found object and a string denoting the kind of object.
 */
async function searchForInfo(client, message, term) {
    try {
        const building = await client.getBuilding(term);
        if (building != null) return [building, 'Building'];
        const character = await client.getCharacter(term);
        if (character != null) return [character, 'Character'];
        const location = await client.getLocation(term);
        if (location != null) return [location, 'Location'];
        const npc = await client.getNpc(term);
        if (npc != null) return [npc, 'NPC'];
    } catch (error) {
        throw new Error(error);
    }
    return null;
}

/**
 * Adds a new line tag after a period.
 * @param {String} info The bio from the varies info tables.
 * @returns {String} The bio with new lines afer periods.
 */
function splitMutlipleSentences(info) {
    return info.split('.').join('.\n');
}

exports.tests = {
    arrayToString,
    capitalize,
    getBuilding,
    getCharacter,
    getLocation,
    getNPC,
    searchForInfo,
    splitMutlipleSentences
};