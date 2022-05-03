const {
    Character
} = require('../models');

const sanitize = require('mongo-sanitize');

/**
 * The Character Mongo calls.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = client => {
    /**
     * Gets the character with the name given.
     * @param {String} name The name of the character.
     * @returns {?String} The Character data if it exists, null if it doesn't.
     */
    client.getCharacter = async (name) => {
        const sName = sanitize(name);
        const data = await Character.findOne({
            name: sName
        });
        return data ? data : null;
    };
    /**
     * Gets the top three characters in an optional stat category.
     * @param {String} optionalStat The optional stat being searched for.
     * @returns {?String} The Character data if it exists, null if it doesn't.
     */
    client.getOptionalStatTopThree = async (optionalStat) => {
        const sOptionalStat = sanitize(optionalStat);
        //Sets up the Find Dictionary in the correct order
        let find = {};
        find['optionalStats.' + sOptionalStat] = 1;
        find['name'] = 1;
        find['_id'] = 0;
        //Sets up the Field Dictionary
        let field = {};
        field['optionalStats.' + sOptionalStat] = {
            $exists: true
        };
        //Sets up the Sort Dictionary in the correct order
        let sort = {};
        sort['optionalStats.' + sOptionalStat] = -1;
        sort['name'] = 1;
        const data = await Character.find(field, find).sort(sort).limit(3);
        return data ? data : null;
    };
    /**
     * Gets the total sum of each optional stat.
     * @returns {?Array} The aggregation data if it exists, null if it doesn't.
     */
    client.getOptionalStatsTotals = async () => {
        const data = await Character.aggregate([{
                $project: {
                    optionalStats: {
                        $objectToArray: "$optionalStats"
                    }
                }
            },
            {
                $unwind: "$optionalStats"
            },
            {
                $group: {
                    _id: "$optionalStats.k",
                    value: {
                        $sum: "$optionalStats.v"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    values: {
                        $push: {
                            k: "$_id",
                            v: "$value"
                        }
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: "$values"
                    }
                }
            }
        ]);
        return data ? data : null;
    };
    /**
     * Gets the top three characters in a stat category.
     * @param {String} stat The stat being searched for.
     * @returns {?String} The Character data if it exists, null if it doesn't.
     */
    client.getStatTopThree = async (stat) => {
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
    /**
     * Gets the total sum of each stat.
     * @returns {?Array} The aggregation data if it exists, null if it doesn't.
     */
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
                healing: {
                    $sum: '$healing'
                },
                kills: {
                    $sum: '$kills'
                },
                knockedOut: {
                    $sum: '$knockedOut'
                },
                nat1s: {
                    $sum: '$nat1s'
                },
                nat20s: {
                    $sum: '$nat20s'
                }
            }
        }]);
        return data ? data : null;
    };
    /**
     * Updates the stats for a character.
     * @param {String} damageDealt The amount of damage a character has dealt.
     * @param {String} damageTaken The amount of damage a character has taken.
     * @param {String} healing The amount of damage a character has healed.
     * @param {String} kills The amount of kills a character has.
     * @param {String} knockedOut The amount of times a character has been knocked out.
     * @param {String} name The name of the character.
     * @param {String} nat1s The amount of nat 1s a character has rolled.
     * @param {String} nat20s The amount of nat 20s a character has rolled.
     * @param {Object} optionalStats Any stats that are optional.
     * @returns {?String} The update response, null if it doesn't.
     */
    client.setStats = async (damageDealt, damageTaken, healing, kills, knockedOut, name, nat1s, nat20s, optionalStats) => {
        const sName = sanitize(name);
        const sKills = sanitize(kills);
        const sDamageDealt = sanitize(damageDealt);
        const sDamageTaken = sanitize(damageTaken);
        const sNat1s = sanitize(nat1s);
        const sNat20s = sanitize(nat20s);
        const sOptionalStats = sanitize(optionalStats);
        const sHealing = sanitize(healing);
        const sKnockedOut = sanitize(knockedOut);
        const data = await Character.updateOne({
            name: sName
        }, {
            kills: sKills,
            damageDealt: sDamageDealt,
            damageTaken: sDamageTaken,
            nat1s: sNat1s,
            nat20s: sNat20s,
            healing: sHealing,
            knockedOut: sKnockedOut,
            optionalStats: sOptionalStats
        });
        return data ? data : null;
    };
};