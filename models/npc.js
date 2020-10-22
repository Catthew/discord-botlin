const mongoose = require('mongoose');

const npcSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    bio: String,
    fullname: String,
    location: String,
    name: String,
    race: String,
    status: String
});

module.exports = mongoose.model('Npc', npcSchema);