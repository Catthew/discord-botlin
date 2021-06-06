const cron = require('node-cron');
const express = require('express');

module.exports = client => {
    const app = express();

    let prefix = process.env.PREFIX;
    let channel = process.env.CHANNEL;
    let port = process.env.PORT;

    //Thursdays at 6:00 PM
    cron.schedule('0 18 * * 4', () => {
        console.log('Sending 1st schedule alert');
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
        console.log('Complete');
    });
    //Saturdays at 12:00 PM
    cron.schedule('0 12 * * 6', () => {
        console.log('Sending 2nd schedule alert');
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
        console.log('Complete');
    });
    //Sunday at 00:00 AM
    cron.schedule('0 0 * * 7', () => {
        console.log('Updating the stats');
        let spreadsheet = process.env.SPREADSHEET;
        var e_stats = require('./excel_stats')(spreadsheet, client);
        console.log('Complete');
    });

    app.listen(port);
    console.log(`Started Cron on port ${port}`);
};