const expect = require('chai').expect;
const {
    tests
} = require('../../commands/info');

describe('info.getBuilding() Test', () => {
    it('Should return the correct MessageEmbed Object for the Stonehill Tavern', () => {
        const testDict = {
            location: 'Phandalin',
            name: 'Stonehill Tavern',
            owner: 'Tablin Stonehill',
            type: 'Tavern'
        };
        const result = tests.getBuilding(testDict);
        expect(result).to.include({
            description: 'Tavern'
        });
        expect(result).to.deep.include({
            fields: [{
                name: 'Location',
                value: 'Phandalin',
                inline: false
            }, {
                name: 'Owner',
                value: 'Tablin Stonehill',
                inline: false
            }]
        });
        expect(result).to.include({
            title: 'Stonehill Tavern'
        });
    });
});