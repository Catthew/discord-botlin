const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    date: Date,
    defaultDay: Number,
    defaultTime: String,
    isOn: Boolean,
    location: String,
    locationDetails: Array,
    mode: String,
    type: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);