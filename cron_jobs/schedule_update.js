/**
 * Updates the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = async (client) => {
    const scheduleSession = await client.getSession();
    if (!scheduleSession['isCancelled']) {
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
    const today = new Date();
    const nextSaturday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 12, 0,0,0);
    const setSession = await client.setSession(nextSaturday);

    if (setSession['nModified'] == 0) {
        console.log(`Error. Update to the Session date failed.`);
        return false;
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