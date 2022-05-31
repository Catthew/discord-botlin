const {
    Schedule
} = require('../models');
const mongoose = require('mongoose');
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
     * Sets the next Session.
     * @param {Boolean} isOn The value to update isOn.
     * @param {String} newDate The DateTime of the next session.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSession = async (isOn, mode, newDate) => {
        const mongoSession = await Schedule.startSession();
        mongoSession.startTransaction();
        try {
            const sIsOn = sanitize(isOn);
            const sMode = sanitize(mode);
            const sNewDate = sanitize(newDate);
            const data = await Schedule.updateOne({
                type: 'Session'
            }, {
                $set: {
                    date: sNewDate,
                    isOn: sIsOn,
                    mode: sMode
                }
            });
            await mongoSession.commitTransaction();
            return data ? data : null;
        } catch (error) {
            await mongoSession.abortTransaction();
            return null;
        } finally {
            mongoSession.endSession();
        }
    };
    /**
     * Changes the value of the field mode.
     * @param {Boolean} vacation The value to update isVacation.
     * @param {Boolean} isOn The value to update isOn.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionMode = async (isOn, mode) => {
        const mongoSession = await Schedule.startSession();
        mongoSession.startTransaction();
        try {
            const sIsOn = sanitize(isOn);
            const sMode = sanitize(mode);
            const data = await Schedule.updateOne({
                type: 'Session'
            }, {
                mode: sMode,
                isOn: sIsOn
            });
            await mongoSession.commitTransaction();
            return data ? data : null;
        } catch (error) {
            await mongoSession.abortTransaction();
            return null;
        } finally {
            mongoSession.endSession();
        }
    };
    /**
     * Updates the date of the session.
     * @param {String} newDate The DateTime of the next session.
     * @returns {?String} The Schedule data if it exists, null if it doesn't.
     */
    client.setScheduleSessionModeTemp = async (newDate) => {
        const mongoSession = await mongoose.startSession();
        mongoSession.startTransaction();
        try {
            const sNewDate = sanitize(newDate);
            const data = await Schedule.updateOne({
                type: 'Session'
            }, {
                $set: {
                    date: sNewDate,
                    isOn: true,
                    mode: 'temp'
                }
            });
            await mongoSession.commitTransaction();
            return data ? data : null;
        } catch (error) {
            await mongoSession.abortTransaction();
            return null;
        } finally {
            mongoSession.endSession();
        }
    };
};