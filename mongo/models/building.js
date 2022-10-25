const { Schema, model } = require('mongoose');

const buildingSchema = new Schema({
    _id: Schema.ObjectId,
    location: String,
    name: String,
    owner: String,
    type: String
});

module.exports = model('Building', buildingSchema, 'buildings');