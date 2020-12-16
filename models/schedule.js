const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    turn: Boolean,
    type: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);