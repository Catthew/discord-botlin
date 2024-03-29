const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    location: String,
    name: String,
    owner: String,
    type: String
});

module.exports = mongoose.model('Building', buildingSchema);