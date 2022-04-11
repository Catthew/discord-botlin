const {
    Schedule
} = require('../models');

const sanitize = require('mongo-sanitize');

/**
 * The Schedule Mongo calls.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = client => {
    /**
     * Gets the current scheduled people.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.getSchedule = async () => {
        const data = await Schedule.find({
            turn: true
        });
        return data ? data : null;
    };
    /**
     * Gets the current scheduled people that are on drink duty.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.getScheduleDrinks = async () => {
        const data = await Schedule.findOne({
            turn: true,
            type: 'Drinks'
        });
        return data ? data : null;
    };
    /**
     * Gets the current session information.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.getSession = async () => {
        const data = await Schedule.findOne({
            type: 'Session'
        });
        return data ? data : null;
    };
    /**
     * Sets the new Drink Schedule.
     * @param {Boolean} isNewTurn If the new turn is active or not.
     * @param {String} turnCount The turn being updated.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setDrink = async (isNewTurn, turnCount) => {
        const sIsNewTurn = sanitize(isNewTurn);
        const sTurnCount = sanitize(turnCount);
        const data = await Schedule.updateOne({
            turnCount: sTurnCount
        }, {
            turn: sIsNewTurn
        });
        return data ? data : null;
    };
    /**
     * Sets the new value of the field isCancelled.
     * @param {Boolean} update The value to update isCancelled.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setCancelled = async (update) => {
        const sUpdate = sanitize(update);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            isCancelled: sUpdate
        });
        return data ? data : null;
    };
    /**
     * Updates the date of the session.
     * @param {String} newDate The DateTime of the next session.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setSession = async (id, newDate) => {
        const sId = sanitize(id);
        const sNewDate = sanitize(newDate);
        const data = await Schedule.updateOne({
            _id: sId
        }, {
            $set: {
                date: sNewDate,
                isCancelled: false
            }
        });
        return data ? data : null;
    };
};