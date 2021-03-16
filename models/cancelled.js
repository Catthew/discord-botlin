const mongoose = require('mongoose');

const cancelledSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    cancelled: Boolean
});

module.exports = mongoose.model('Cancelled', cancelledSchema);