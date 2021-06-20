const cron = require('node-cron');
const express = require('express');

module.exports = client => {
    const app = express();

    let prefix = process.env.PREFIX;
    let channel = process.env.CHANNEL;
    let port = process.env.PORT;

    //Thursdays at 6:00 PM (+4 hours due to server)
    cron.schedule('0 22 * * 4', () => {
        console.log('Sending 1st schedule alert');
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
        console.log('Complete');
    });
    //Saturdays at 12:00 PM (+4 hours due to server)
    cron.schedule('0 16 * * 6', () => {
        console.log('Sending 2nd schedule alert');
        client.channels.cache.get(channel).send(`${prefix} schedule`).catch(console.error);
        console.log('Complete');
    });
    //Sunday at 00:00 AM (+4 hours due to server)
    cron.schedule('0 4 * * 7', () => {
        console.log('Updating the stats');
        require('./excel_stats')(process.env.SPREADSHEET, client);
        console.log('Complete');
    });

    app.listen(port);
    console.log(`Started Cron on port ${port}`);
};