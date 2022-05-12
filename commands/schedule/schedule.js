const responses = require("../../constants/responses");

/**
 * Gets the information for the scheduled session.
 * @param {Discord.Client} client The client instance of the bot.
 */
async function getSchedule(client) {
    let session;
    try {
        session = await client.getScheduleSession();
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Sends the command to Cancel or Uncancel a DnD Session.
 * @param {Discord.Client} client The client instance of the bot.
 */
async function setSchedule(client, command, type) {
    try {
        let setSession;
        if (type == 'dateTime') setSession = await client.setScheduleSessionDateTime(command);
        else if (type == 'session') setSession = await client.setScheduleSessionOnOff(command);
        else if (type == 'vacation') setSession = await client.setScheduleSessionVacation(command);
        else throw new Error(responses.invalidCommandValue[0]);

        if (setSession['modifiedCount'] == 0 || setSession === null) return false;
        else return true;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getSchedule,
    setSchedule
};