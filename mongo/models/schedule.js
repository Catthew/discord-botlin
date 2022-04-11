const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    appleMaps: String,
    date: Date,
    day: String,
    googleMaps: String,
    isCancelled: Boolean,
    location: String,
    name: String,
    turn: Boolean,
    turnCount: Number,
    type: String,
});

module.exports = mongoose.model('Schedule', scheduleSchema);