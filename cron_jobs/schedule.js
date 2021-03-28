const cron = require('node-cron');
const express = require('express');
const {
    prefix,
    schedule_channel,
    schedule_port
} = require('../config.js');

module.exports = client => {
    console.log('Starting Schedule cron_job');

    const app = express();
    
    //Thursdays at 6:00 PM
    cron.schedule('0 18 * * 4', function () {
        client.channels.cache.get(schedule_channel).send(`${prefix} schedule`).catch(console.error);
    });
    //Saturdays at 12:00 PM
    cron.schedule('0 12 * * 6', function () {
        client.channels.cache.get(schedule_channel).send(`${prefix} schedule`).catch(console.error);
    });

    app.listen(schedule_port);
};