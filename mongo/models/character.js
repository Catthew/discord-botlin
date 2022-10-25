const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
    _id: Schema.ObjectId,
    alias: Array,
    bio: String,
    class: String,
    damageDealt: Number,
    damageTaken: Number,
    fullname: String,
    healing: Number,
    kills: Number,
    knockedOut: Number,
    name: String,
    nat1s: Number,
    nat20s: Number,
    optionalStats: Object,
    race: String,
    type: String
});

module.exports = model('Character', characterSchema, 'characters');