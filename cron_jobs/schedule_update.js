const {
    parse
} = require("dotenv-flow");

/**
 * Updates the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = async (client) => {
    const scheduleSession = await client.getSession();
    /*
    if (!scheduleSession['isOff']) {
        const scheduleDrinks = await client.getScheduleDrinks();
        const turnCount = scheduleDrinks['turnCount'];
        const oldTurn = await setDrinkTurn(client, false, turnCount);
        if (!oldTurn) {
            return;
        }

        const newTurnCount = turnCount == 4 ? 1 : turnCount + 1;
        const newTurn = await setDrinkTurn(client, true, newTurnCount);
        if (!newTurn) {
            return;
        }
    }
    */
    const today = new Date();
    const days = {
        'Friday': 6,
        'Saturday': 7
    };
    const time = scheduleSession.defaultTime.split(":").map(function (item) {
        return parseInt(item, 10);
    });
    const nextSession = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days[scheduleSession.defaultDay], time[0], time[1], 0, 0);
    const setSession = await client.setSession(scheduleSession._id, nextSession);
    if (setSession['modifiedCount'] == 0) {
        console.log(`Error. Update to the Session date failed.`);
        return;
    }
};

/**
 * Updates the drink turn.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Boolean} isNewTurn If the new turn is active or not.
 * @param {Number} turnCount The turn being updated.
 * @returns {Boolean} true if the drink turn was updated successfully, false if not.
 */
async function setDrinkTurn(client, isNewTurn, turnCount) {
    const setTurn = await client.setDrink(isNewTurn, turnCount);

    if (setTurn['nModified'] == 0) {
        console.log(`Error. Update failed for turnCount: ${turnCount}.`);
        return false;
    }

    return true;
}