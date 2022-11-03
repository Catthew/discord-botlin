module.exports = client => {
    require('./building')(client);
    require('./character')(client);
    require('./location')(client);
    require('./npc')(client);
    require('./schedule')(client);
};