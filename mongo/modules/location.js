const {
    Building,
    Location,
    Npc
} = require('../models');
const sanitize = require('mongo-sanitize');

/**
 * The Location Mongo calls.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = client => {
    /**
     * Gets the current location of the squad.
     * @returns {?String} The Location data if it exists, null if it doesn't.
     */
    client.getCurrentLocation = async () => {
        const data = await Location.findOne({
            currentLocation: true
        });
        return data ? data : null;
    };
    /**
     * Gets the location with the name given.
     * @param {String} name The name of the location.
     * @returns {?String} The Location data if it exists, null if it doesn't.
     */
    client.getLocation = async (name) => {
        const sName = sanitize(name);
        const data = await Location.findOne({
            name: sName
        });
        return data ? data : null;
    };
    /**
     * Gets the location data needed for the info embed
     * @param {String} location The name of the location.
     * @returns A list of builings and NPCs that have the location being looked up.
     */
    client.getLocationDetails = async (location) => {
        const sLocation = sanitize(location);
        const locationBuilding = await Building.find({
            location: sLocation
        }, {
            name: 1,
            _id: 0
        });
        const locationNpc = await Npc.find({
            location: location
        }, {
            fullname: 1,
            _id: 0
        });
        return [locationBuilding, locationNpc];
    };
};