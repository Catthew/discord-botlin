const mongoose = require('mongoose');
const {
    database
} = require('../config.js');

module.exports = {
    init: () => {
        const dbOptions = {
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4,
            poolSize: 5,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect(`mongodb://localhost:27017/${database}`, dbOptions);
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection successfully opened!');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
        });

        mongoose.connection.on('err', err => {
            console.log(`Mongoose connection error: \n ${err.stack}`);
        });
    }
};