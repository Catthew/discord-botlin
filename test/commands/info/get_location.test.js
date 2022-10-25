const expect = require('chai').expect;
const info = require('../../../commands/info');

describe('info.getBuilding() Test', () => {
    it('Should return the correct EmbedBuilder Object for Phandolin', () => {
        const testDict = {
            name: 'Phandalin',
            bio: 'Saved',
            currentLocation: false
        };
        const testArray = [
            [{
                name: "Barthin's Provisions"
            }, {
                name: 'Stonehill Tavern'
            }],
            [{
                fullname: 'Tablin Stonehill'
            }]
        ];
        const result = info.getLocation(testDict, testArray).data;
        expect(result).to.include({
            description: 'Saved'
        });
        expect(result).to.deep.include({
            fields: [{
                name: 'Notable Citizens',
                value: 'Tablin Stonehill'
            }, {
                name: 'Notable Stores',
                value: 'Barthin\'s Provisions\nStonehill Tavern'
            }]
        });
        expect(result).to.include({
            title: 'Phandalin'
        });
    });
});