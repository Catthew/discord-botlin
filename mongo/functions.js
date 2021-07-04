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

    client.getBuilding = async (name) => {
        const sName = sanitize(name);
        const data = await Building.findOne({
            name: sName
        });
        return data ? data : null;
    };

    // =========== Characters ===========

    client.getCharacter = async (name) => {
        const sName = sanitize(name);
        const data = await Character.findOne({
            name: sName
        });
        return data ? data : null;
    };

    client.getStats = async (name) => {
        const sName = sanitize(name);
        const data = await Character.findOne({
            name: sName
        });
        return data ? data : null;
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
        return data ? data : null;
    };

    client.getTop = async (stat) => {
        const sStat = sanitize(stat);
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
        return data ? data : null;
    };

    client.setStats = async (name, kills, damageDealt, damageTaken, nat1, nat20, redCoin, healing, ko) => {
        const sName = sanitize(name);
        const sKills = sanitize(kills);
        const sDamageDealt = sanitize(damageDealt);
        const sDamageTaken = sanitize(damageTaken);
        const sNat1 = sanitize(nat1);
        const sNat20 = sanitize(nat20);
        const sRedCoin = sanitize(redCoin);
        const sHealing = sanitize(healing);
        const sKo = sanitize(ko);
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
        return data ? data : null;
    };

    // =========== Locations ===========

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

    // =========== Npcs ===========

    client.getNpc = async (name) => {
        const sName = sanitize(name);
        const data = await Npc.findOne({
            name: sName
        });
        return data ? data : null;
    };

    // =========== Schedules ===========

    client.getCancelled = async () => {
        const sCancelled = process.env.CANCELLED;
        const data = await Schedule.findOne({
            _id: sCancelled
        }).limit(1);
        return data ? data : null;
    };

    client.getSchedule = async () => {
        const data = await Schedule.find({
            turn: true
        });
        return data ? data : null;
    };

    client.getScheduleDrinks = async () => {
        const data = await Schedule.findOne({
            turn: true,
            type: 'Drinks'
        });
        return data ? data : null;
    };

    client.setTurn = async (turnCount, newTurn) => {
        const sTurnCount = sanitize(turnCount);
        const data = await Schedule.updateOne({
            turnCount: sTurnCount
        }, {
            turn: newTurn
        });
        return data ? data : null;
    };
};