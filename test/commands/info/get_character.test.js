const expect = require('chai').expect;
const info = require('../../../commands/info');

describe('info.getCharacter() Test', () => {
    it('Should return the correct EmbedBuilder Object for Stoth', () => {
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
        const result = info.getCharacter(testDict).data;
        expect(result).to.include({
            description: 'From Thundertree'
        });
        expect(result).to.deep.include({
            fields: [{
                name: 'Class',
                value: 'Fighter'
            }, {
                name: 'Race',
                value: 'Human'
            }, {
                name: 'Stats',
                value: 'Kills: 7\nDamage Dealt: 200\nDamage Taken: 200\nNat 20: 5\nNat 1: 1'
            }]
        });
        expect(result).to.include({
            title: 'Stoth Bedz'
        });
    });
});