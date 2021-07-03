const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    date: Date,
    isCancelled: Boolean,
    location: String,
    name: String,
    turn: Boolean,
    turnCount: Number,
    type: String,
});

module.exports = mongoose.model('Schedule', scheduleSchema);