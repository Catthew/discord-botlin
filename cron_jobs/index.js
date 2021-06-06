const cron = require('node-cron');
const express = require('express');

module.exports = client => {
    const app = express();

    let prefix = process.env.PREFIX;
    let channel = process.env.CHANNEL;
    let port = process.env.SCHEDULE_PORT;

    //Thursdays at 6:00 PM
    cron.schedule('0 18 * * 4', () => {
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
    });
    //Saturdays at 12:00 PM
    cron.schedule('0 12 * * 6', () => {
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
    });
    //Sunday at 00:00 AM
    cron.schedule('03 14 * * 7', () => {
        console.log('Updating the stats');
        let spreadsheet = process.env.SPREADSHEET;
        var e_stats = require('./excel_stats')(spreadsheet, client);
        console.log('Done');
    });

    app.listen(port);
    console.log(`Started Cron on port ${port}`);
};