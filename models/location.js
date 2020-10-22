const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    status: String
});

module.exports = mongoose.model('Location', locationSchema);