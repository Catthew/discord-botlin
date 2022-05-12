const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    date: Date,
    defaultDay: String,
    defaultTime: String,
    isOn: Boolean,
    isVacation: Boolean,
    location: String,
    locationDetails: Array,
    type: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);