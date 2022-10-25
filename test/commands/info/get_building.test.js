const expect = require('chai').expect;
const info = require('../../../commands/info');

describe('info.getBuilding() Test', () => {
    it('Should return the correct EmbedBuilder Object for the Stonehill Tavern', () => {
        const testDict = {
            location: 'Phandalin',
            name: 'Stonehill Tavern',
            owner: 'Tablin Stonehill',
            type: 'Tavern'
        };
        const result = info.getBuilding(testDict).data;
        expect(result).to.include({
            description: 'Tavern'
        });
        expect(result).to.deep.include({
            fields: [{
                name: 'Location',
                value: 'Phandalin'
            }, {
                name: 'Owner',
                value: 'Tablin Stonehill'
            }]
        });
        expect(result).to.include({
            title: 'Stonehill Tavern'
        });
    });
});