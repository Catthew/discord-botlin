const {
    Npc
} = require('../models');

const sanitize = require('mongo-sanitize');

module.exports = client => {
    client.getNpc = async (name) => {
        const sName = sanitize(name);
        const data = await Npc.findOne({
            name: sName
        });
        return data ? data : null;
    };
};