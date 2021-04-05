const cron = require('node-cron');
const express = require('express');

module.exports = client => {
    const app = express();

    let prefix = process.env.PREFIX;
    let schedule_channel = process.env.SCHEDULE_CHANNEL;
    let schedule_port = process.env.SCHEDULE_PORT;

    //Thursdays at 6:00 PM
    cron.schedule('0 18 * * 4', function () {
        client.channels.cache.get(schedule_channel).send(`${prefix} schedule`).catch(console.error);
    });
    //Saturdays at 12:00 PM
    cron.schedule('0 12 * * 6', function () {
        client.channels.cache.get(schedule_channel).send(`${prefix} schedule`).catch(console.error);
    });

    app.listen(schedule_port);
    console.log(`Started Schedule Cron Job on port ${schedule_port}`);
};