const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
    _id: Schema.ObjectId,
    date: Date,
    defaultDay: Number,
    defaultTime: String,
    isOn: Boolean,
    location: String,
    locationDetails: Array,
    mode: String,
    type: String
});

module.exports = model('Schedule', scheduleSchema, 'schedules');