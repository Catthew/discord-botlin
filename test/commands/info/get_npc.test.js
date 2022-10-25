const expect = require('chai').expect;
const info = require('../../../commands/info');

describe('info.getCharacter() Test', () => {
    it('Should return the correct EmbedBuilder Object for Boblin', () => {
        const testDict = {
            bio: 'The best goblin ever',
            fullname: 'Boblin',
            location: 'With Party',
            race: 'Goblin',
            status: 'Alive'
        };
        const result = info.getNPC(testDict).data;
        expect(result).to.include({
            description: 'The best goblin ever'
        });
        expect(result).to.deep.include({
            fields: [{
                name: 'Location',
                value: 'With Party'
            }, {
                name: 'Race',
                value: 'Goblin'
            }, {
                name: 'Status',
                value: 'Alive'
            }]
        });
        expect(result).to.include({
            title: 'Boblin'
        });
    });
});