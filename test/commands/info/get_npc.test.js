const expect = require('chai').expect;
const {
    tests
} = require('../../../commands/info');

describe('info.getCharacter() Test', () => {
    it('Should return the correct EmbedBuilder Object for Boblin', () => {
        const testDict = {
            bio: 'The best goblin ever',
            fullname: 'Boblin',
            location: 'With Party',
            race: 'Goblin',
            status: 'Alive'
        };
        const result = tests.getNPC(testDict);
        expect(result).to.include({
            description: 'The best goblin ever'
        });
        expect(result).to.deep.include({
            fields: [{
                name: 'Location',
                value: 'With Party',
                inline: false
            }, {
                name: 'Race',
                value: 'Goblin',
                inline: false
            }, {
                name: 'Status',
                value: 'Alive',
                inline: false
            }]
        });
        expect(result).to.include({
            title: 'Boblin'
        });
    });
});