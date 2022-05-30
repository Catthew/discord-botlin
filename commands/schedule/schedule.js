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
 * @param {Array.<String>} command The commands for the set query.
 * @param {String} setScheduleType The type of set query that is being run.
 */
async function setSchedule(client, command, setScheduleType) {
    try {
        let setSession;
        if (setScheduleType == 'dateTime') setSession = await client.setScheduleSessionDateTime(command[0]);
        else if (setScheduleType == 'nextSession') setSession = await client.setScheduleSessionNext(command[0], command[1]);
        else if (setScheduleType == 'session') setSession = await client.setScheduleSessionIsOn(command[0]);
        else if (setScheduleType == 'vacation') setSession = await client.setScheduleSessionMode(command[0]);
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