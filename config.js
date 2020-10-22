require('dotenv-flow').config();

module.exports = {
    activity: process.env.ACTIVITY,
    at: process.env.AT,
    database: process.env.DATABASE,
    id: process.env.ID,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    storytime: process.env.STORYTIME,
    token: process.env.TOKEN,
    weather: process.env.WEATHER
};