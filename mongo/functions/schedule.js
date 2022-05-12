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
     * Gets the current session information.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.getScheduleSession = async () => {
        const data = await Schedule.findOne({
            type: 'Session'
        });
        return data ? data : null;
    };
    /**
     * Updates the date of the session.
     * @param {String} newDate The DateTime of the next session.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionDateTime = async (newDate) => {
        const sNewDate = sanitize(newDate);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            $set: {
                date: sNewDate,
                isOff: false,
                isVacation: false
            }
        });
        return data ? data : null;
    };
    /**
     * Changes the value of the field isOff.
     * @param {Boolean} onOff The value to update isOff.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionOnOff = async (isOnOff) => {
        const sIsOnOff = sanitize(isOnOff);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            isOff: sIsOnOff
        });
        return data ? data : null;
    };
    /**
     * Changes the value of the field isVacation.
     * @param {Boolean} vacation The value to update isOff.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionVacation = async (isVacation) => {
        const sIsVacation = sanitize(isVacation);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            isVacation: sIsVacation
        });
        return data ? data : null;
    };
};