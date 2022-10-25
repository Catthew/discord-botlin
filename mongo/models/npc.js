const { Schema, model } = require('mongoose');

const npcSchema = new Schema({
    _id: Schema.ObjectId,
    bio: String,
    fullname: String,
    location: String,
    name: String,
    race: String,
    status: String
});

module.exports = model('Npc', npcSchema, 'npcs');