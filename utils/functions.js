const {
    Building,
    Character,
    Location,
    Npc,
    Schedule
} = require('../models');

module.exports = client => {
    client.getBuilding = async name => {
        const data = await Building.findOne({
            name: name
        });
        if (data) return data;
        else return null;
    };

    client.getCancelled = async x => {
        const data = await Schedule.findOne({_id:process.env.CANCELLED}).limit(1);
        if (data) return data;
        else return null;
    };

    client.getCharacter = async name => {
        const data = await Character.findOne({
            name: name
        });
        if (data) return data;
        else return null;
    };

    client.getLocation = async name => {
        const data = await Location.findOne({
            name: name
        });
        if (data) return data;
        else return null;
    };

    client.getLocationDetails = async location => {
        const locationBuilding = await Building.find({
            location: location
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

    client.getNpc = async name => {
        const data = await Npc.findOne({
            name: name
        });
        if (data) return data;
        else return null;
    };

    client.getSchedule = async x => {
        const data = await Schedule.find({
            turn: true
        });
        if (data) return data;
        else return null;
    };

    client.getStats = async user_name => {
        const data = await Character.findOne({
            name: user_name
        });
        if (data) return data;
        else return null;
    };

    client.getTop = async stat => {
        //Sets up the Find Dictionary in the correct order
        let find = {};
        find[stat] = 1;
        find['name'] = 1;
        find['_id'] = 0;
        //Sets up the Field Dictionary
        let field = {};
        field[stat] = {
            $exists: true
        };
        //Sets up the Sort Dictionary in the correct order
        let sort = {};
        sort[stat] = -1;
        sort['name'] = 1;
        const data = await Character.find(field, find).sort(sort).limit(3);
        if (data) return data;
        else return null;
    };
};