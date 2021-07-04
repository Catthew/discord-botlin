const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    bio: String,
    currentLocation: Boolean,
    name: String,
    
});

module.exports = mongoose.model('Location', locationSchema);