const {
    Building,
    Character,
    Location,
    Npc
} = require('../models');

module.exports = client => {
    client.getBuilding = async name => {
        const data = await Building.findOne({
            name: name
        });
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

    client.getStats = async user_name => {
        const data = await Character.findOne({
            name: user_name
        });
        if (data) return data;
        else return null;
    };

    client.getTop = async stat => {
        let find;
        let field;
        let sort;
        switch (stat) {
            case 'kills':
                field = {
                    kills: {
                        $exists: true
                    }
                };
                find = {
                    kills: 1,
                    name: 1,
                    _id: 0
                };
                sort = {
                    kills: -1,
                    name: 1
                };
                break;
            case 'damageDealt':
                field = {
                    damageDealt: {
                        $exists: true
                    }
                };
                find = {
                    damageDealt: 1,
                    name: 1,
                    _id: 0
                };
                sort = {
                    damageDealt: -1,
                    name: 1
                };
                break;
            case 'damageTaken':
                field = {
                    damageTaken: {
                        $exists: true
                    }
                };
                find = {
                    damageTaken: 1,
                    name: 1,
                    _id: 0
                };
                sort = {
                    damageTaken: -1,
                    name: 1
                };
                break;
            case 'nat1':
                field = {
                    nat1: {
                        $exists: true
                    }
                };
                find = {
                    name: 1,
                    nat1: 1,
                    _id: 0
                };
                sort = {
                    nat1: -1,
                    name: 1
                };
                break;
            case 'nat20':
                field = {
                    nat20: {
                        $exists: true
                    }
                };
                find = {
                    name: 1,
                    nat20: 1,
                    _id: 0
                };
                sort = {
                    nat20: -1,
                    name: 1
                };
                break;
            default:
                return null;
        }
        const data = await Character.find(field, find).sort(sort).limit(3);
        if (data) return data;
        else return null;
    };
};