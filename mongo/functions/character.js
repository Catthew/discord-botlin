const {
    Character
} = require('../../models');

const sanitize = require('mongo-sanitize');

module.exports = client => {

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

};