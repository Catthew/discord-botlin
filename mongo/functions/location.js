const {
    Building,
    Location,
    Npc
} = require('../../models');

const sanitize = require('mongo-sanitize');

module.exports = client => {
    client.getCurrentLocation = async () => {
        const data = await Location.findOne({
            currentLocation: true
        });
        return data ? data : null;
    };

    client.getLocation = async (name) => {
        const sName = sanitize(name);
        const data = await Location.findOne({
            name: sName
        });
        return data ? data : null;
    };

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