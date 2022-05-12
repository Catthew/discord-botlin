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
                isOn: true,
                isVacation: false
            }
        });
        return data ? data : null;
    };
    /**
     * Sets the next Session.
     * @param {Boolean} isOn The value to update isOn.
     * @param {String} newDate The DateTime of the next session.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionNext = async (newDate, isOn) => {
        const sIsOn = sanitize(isOn);
        const sNewDate = sanitize(newDate);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            $set: {
                date: sNewDate,
                isOn: sIsOn
            }
        });
        return data ? data : null;
    };
    /**
     * Changes the value of the field isOn.
     * @param {Boolean} isOn The value to update isOn.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionOn = async (isOn) => {
        const sIsOn = sanitize(isOn);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            isOn: sIsOn
        });
        return data ? data : null;
    };
    /**
     * Changes the value of the field isVacation.
     * @param {Boolean} vacation The value to update isVacation.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionVacation = async (isVacation) => {
        const sIsVacation = sanitize(isVacation);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            isVacation: sIsVacation,
            isOn: !sIsVacation
        });
        return data ? data : null;
    };
};