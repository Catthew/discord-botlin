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
     * Sets the new value of the field isOff.
     * @param {Boolean} update The value to update isOff.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionOnOff = async (update) => {
        const sUpdate = sanitize(update);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            isOff: sUpdate
        });
        return data ? data : null;
    };
    /**
     * Updates the date of the session.
     * @param {String} newDate The DateTime of the next session.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSession = async (id, newDate) => {
        const sId = sanitize(id);
        const sNewDate = sanitize(newDate);
        const data = await Schedule.updateOne({
            _id: sId
        }, {
            $set: {
                date: sNewDate,
                isOff: false
            }
        });
        return data ? data : null;
    };
};