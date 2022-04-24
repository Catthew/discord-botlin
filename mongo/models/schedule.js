const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    date: Date,
    defaultDay: String,
    defaultTime: String,
    isCancelled: Boolean,
    location: String,
    locationDetails: Array,
    name: String,
    turn: Boolean,
    turnCount: Number,
    type: String,
});

module.exports = mongoose.model('Schedule', scheduleSchema);