const {
    Building
} = require('../models');

const sanitize = require('mongo-sanitize');

module.exports = client => {
    client.getBuilding = async (name) => {
        const sName = sanitize(name);
        const data = await Building.findOne({
            name: sName
        });
        return data ? data : null;
    };
};