const {
    Building,
    Character,
    Location,
    Npc,
    Schedule
} = require('../models');

const sanitize = require('mongo-sanitize');

module.exports = client => {

    // =========== Buildings ===========

    client.getBuilding = async name => {
        let sName = sanitize(name);
        const data = await Building.findOne({
            name: sName
        });
        if (data) return data;
        else return null;
    };

    // =========== Characters ===========

    client.getCharacter = async name => {
        let sName = sanitize(name);
        const data = await Character.findOne({
            name: sName
        });
        if (data) return data;
        else return null;
    };

    client.getStats = async name => {
        let sName = sanitize(name);
        const data = await Character.findOne({
            name: sName
        });
        if (data) return data;
        else return null;
    };

    client.getStatsTotals = async () => {
        const data = await Character.aggregate([{
            $group: {
                _id: null,
                damageDealt: {
                    $sum: '$damageDealt'
                },
                damageTaken: {
                    $sum: '$damageTaken'
                },
                kills: {
                    $sum: '$kills'
                },
                nat1: {
                    $sum: '$nat1'
                },
                nat20: {
                    $sum: '$nat20'
                },
                ko: {
                    $sum: '$ko'
                },
                redCoin: {
                    $sum: '$redCoin'
                },
                healing: {
                    $sum: '$healing'
                }
            }
        }]);
        if (data) return data;
        else return null;
    };

    client.getTop = async stat => {
        let sStat = sanitize(stat);
        //Sets up the Find Dictionary in the correct order
        let find = {};
        find[sStat] = 1;
        find['name'] = 1;
        find['_id'] = 0;
        //Sets up the Field Dictionary
        let field = {};
        field[sStat] = {
            $exists: true
        };
        //Sets up the Sort Dictionary in the correct order
        let sort = {};
        sort[sStat] = -1;
        sort['name'] = 1;
        const data = await Character.find(field, find).sort(sort).limit(3);
        if (data) return data;
        else return null;
    };

    client.setStats = async (name, kills, damageDealt, damageTaken, nat1, nat20, redCoin, healing, ko) => {
        let sName = sanitize(name);
        let sKills = sanitize(kills);
        let sDamageDealt = sanitize(damageDealt);
        let sDamageTaken = sanitize(damageTaken);
        let sNat1 = sanitize(nat1);
        let sNat20 = sanitize(nat20);
        let sRedCoin = sanitize(redCoin);
        let sHealing = sanitize(healing);
        let sKo = sanitize(ko);

        const data = await Character.updateOne({
            name: sName
        }, {
            kills: sKills,
            damageDealt: sDamageDealt,
            damageTaken: sDamageTaken,
            nat1: sNat1,
            nat20: sNat20,
            redCoin: sRedCoin,
            healing: sHealing,
            ko: sKo
        });
        if (data) return data;
        else return null;
    };

    // =========== Locations ===========

    client.getLocation = async name => {
        let sName = sanitize(name);
        const data = await Location.findOne({
            name: sName
        });
        if (data) return data;
        else return null;
    };

    client.getLocationDetails = async location => {
        let sLocation = location;
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

    // =========== Npcs ===========

    client.getNpc = async name => {
        let sName = sanitize(name);
        const data = await Npc.findOne({
            name: sName
        });
        if (data) return data;
        else return null;
    };

    // =========== Schedules ===========

    client.getCancelled = async () => {
        let sCancelled = process.env.CANCELLED;
        const data = await Schedule.findOne({
            _id: sCancelled
        }).limit(1);
        if (data) return data;
        else return null;
    };

    client.getSchedule = async () => {
        const data = await Schedule.find({
            turn: true
        });
        if (data) return data;
        else return null;
    };

    client.getScheduleDrinks = async () => {
        const data = await Schedule.findOne({
            turn: true,
            type: 'Drinks'
        });
        if (data) return data;
        else return null;
    };

    client.setTurn = async (turnCount, newTurn) => {
        let sTurnCount = sanitize(turnCount);
        const data = await Schedule.updateOne({
            turnCount: sTurnCount
        }, {
            turn: newTurn
        });
        if (data) return data;
        else return null;
    };
};