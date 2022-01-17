const {
    Building
} = require('../models');

const sanitize = require('mongo-sanitize');

/**
 * The Building Mongo calls.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = client => {
    /**
     * Gets the building with the name given.
     * @param {String} name The name of the building.
     * @returns {?String} The Building data if it exists, null if it doesn't.
     */
    client.getBuilding = async (name) => {
        const sName = sanitize(name);
        const data = await Building.findOne({
            name: sName
        });
        return data ? data : null;
    };
};