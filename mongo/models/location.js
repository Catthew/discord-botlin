const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
    _id: Schema.ObjectId,
    bio: String,
    currentLocation: Boolean,
    name: String,
});

module.exports = model('Location', locationSchema, 'locations');