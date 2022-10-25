const expect = require('chai').expect;
const info = require('../../../commands/info');

describe('info.arrayToString() Test', () => {
    it('Should return None when sent []', () => {
        const testArray = [];
        const result = info.arrayToString(testArray);
        expect(result).to.equal('None');
    });
    it('Should return ["Catthew"] when sent ["Catthew"]', () => {
        const testArray = ['Catthew'];
        const result = info.arrayToString(testArray);
        expect(result).to.equal(testArray);
    });
    it('Should return Catthew\nCatthew when sent ["Catthew", "Catthew"]', () => {
        const testArray = ['Catthew', 'Catthew'];
        const result = info.arrayToString(testArray);
        expect(result).to.equal('Catthew\nCatthew');
    });
});