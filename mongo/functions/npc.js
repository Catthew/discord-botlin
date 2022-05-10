const {
    Npc
} = require('../models');
const sanitize = require('mongo-sanitize');

/**
 * The NPC Mongo calls.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = client => {
    /**
     * Gets the npc with the name given.
     * @param {String} name The name of the npc.
     * @returns {?String} The NPC data if it exists, null if it doesn't.
     */
    client.getNpc = async (name) => {
        const sName = sanitize(name);
        const data = await Npc.findOne({
            name: sName
        });
        return data ? data : null;
    };
};