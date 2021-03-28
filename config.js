require('dotenv-flow').config();

module.exports = {
    activity: process.env.ACTIVITY,
    at: process.env.AT,
    cancelled: process.env.CANCELLED,
    database: process.env.DATABASE,
    id: process.env.ID,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    schedule_channel: process.env.SCHEDULE_CHANNEL,
    token: process.env.TOKEN,
    weather: process.env.WEATHER
};