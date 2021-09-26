const {
    Schedule
} = require('../../models');

const sanitize = require('mongo-sanitize');

module.exports = client => {
    client.getCancelled = async () => {
        const data = await Schedule.findOne({
            type: 'Session'
        }).limit(1);
        return data ? data : null;
    };

    client.getSchedule = async () => {
        const data = await Schedule.find({
            turn: true
        });
        return data ? data : null;
    };

    client.getScheduleDrinks = async () => {
        const data = await Schedule.findOne({
            turn: true,
            type: 'Drinks'
        });
        return data ? data : null;
    };

    client.getScheduleSession = async () => {
        const data = await Schedule.findOne({
            type: 'Session'
        });
        return data ? data : null;
    };

    client.setDrink = async (turnCount, isNewTurn) => {
        const sTurnCount = sanitize(turnCount);
        const sIsNewTurn = sanitize(isNewTurn);
        const data = await Schedule.updateOne({
            turnCount: sTurnCount
        }, {
            turn: sIsNewTurn
        });
        return data ? data : null;
    };

    client.setSession = async (newDate) => {
        const sNewDate = sanitize(newDate);
        const data = await Schedule.updateOne({
            type: 'Session'
        }, {
            date: sNewDate,
            isCancelled: false
        });
        return data ? data : null;
    };
};