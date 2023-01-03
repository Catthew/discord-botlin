const {
    ThreadAutoArchiveDuration
} = require('discord.js');

const common = require('../../utils/common_modules');

const FILENAME = __filename.slice(__dirname.length + 1);

/**
 * Sends a thread to get the players the Schedule.
 * @param {Discord.Client} client The client instance of the bot.
 */
async function newThread(client) {
    try {
        const today = new Date();
        const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const nextMonth = nextMonthDate.toLocaleString('default', { month: 'long' });
        const threadName = `${nextMonth} unavailability.`;

        const channel = await client.channels.fetch(process.env.CHANNELSCHEDULE);
        await channel.send(`@here ${threadName} thread is below. \nNote: It is available for one week and only post **unavailability**`);
        channel.threads.create({
            name: threadName,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            reason: 'New schedule post',
        });

    } catch (error) {
        common.logAndSendError(error, FILENAME, null, null);
        return;
    }
}

module.exports = {
    newThread
};