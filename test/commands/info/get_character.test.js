const expect = require('chai').expect;
const {
    tests
} = require('../../../commands/info');

describe('info.getCharacter() Test', () => {
    it('Should return the correct MessageEmbed Object for Stoth', () => {
        const testDict = {
            bio: 'From Thundertree',
            class: 'Fighter',
            damageDealt: 200,
            damageTaken: 200,
            fullname: 'Stoth Bedz',
            kills: 7,
            nat1: 1,
            nat20: 5,
            race: 'Human',
            type: 'Character'
        };
        const result = tests.getCharacter(testDict);
        expect(result).to.include({
            description: 'From Thundertree'
        });
        expect(result).to.deep.include({
            fields: [{
                name: 'Class',
                value: 'Fighter',
                inline: false
            }, {
                name: 'Race',
                value: 'Human',
                inline: false
            }, {
                name: 'Stats',
                value: 'Kills: 7\nDamage Dealt: 200\nDamage Taken: 200\nNat 20: 5\nNat 1: 1',
                inline: false
            }]
        });
        expect(result).to.include({
            title: 'Stoth Bedz'
        });
    });
});