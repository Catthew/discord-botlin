const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    alias: Array,
    bio: String,
    class: String,
    damageDealt: Number,
    damageTaken: Number,
    fullname: String,
    healing: Number,
    kills: Number,
    ko: Number,
    name: String,
    nat1: Number,
    nat20: Number,
    optionalStats: Object,
    race: String,
    type: String
});

module.exports = mongoose.model('Character', characterSchema);