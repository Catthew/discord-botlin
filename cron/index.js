const cron = require('node-cron');
const express = require('express');

/**
 * Sets the Cron Jobs.
 * @param {Discord.Client} client The client instance of the bot.
 */
module.exports = client => {
    const app = express();

    let prefix = process.env.PREFIX;
    let channel = process.env.CHANNELGENERAL;
    let port = process.env.CRONPORT;

    /*
        Update the DnD schedule
        Monday at 12:00 AM
    */
    cron.schedule('* * * * *', () => {
        console.log('Updating the schedule');
        require('./scripts/schedule_update')(client);
        console.log('Complete');
    });

    /*
        Send the first schedule alert
        Wednesday at 6:00 PM
    */
    cron.schedule('0 18 * * 3', () => {
        console.log('Sending 1st schedule alert');
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
        console.log('Complete');
    });

    /*
        Send the second schedule alert
        Friday at 12:00 PM
    */
    cron.schedule('0 12 * * 5', () => {
        console.log('Sending 2nd schedule alert');
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
        console.log('Complete');
    });

    /*
        Send the stats
        Sunday at 00:00 AM 
    */
    cron.schedule('0 0 * * 7', () => {
        console.log('Updating the stats');
        require('./scripts/excel_stats').syncStats(process.env.SPREADSHEET, client, false);
        console.log('Complete');
    });

    app.listen(port);
    console.log(`Started Cron on port ${port}`);
};