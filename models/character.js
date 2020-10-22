const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    alias: Array,
    bio: String,
    class: String,
    damageDealt: Number,
    damageTaken: Number,
    fullname: String,
    kills: Number,
    name: String,
    nat1: Number,
    nat20: Number,
    race: String,
    type: String
});

module.exports = mongoose.model('Character', characterSchema);