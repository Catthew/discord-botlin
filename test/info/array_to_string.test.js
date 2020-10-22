const expect = require('chai').expect;
const {
    tests
} = require('../../commands/info');

describe('info.arrayToString() Test', () => {
    it('Should return None when sent []', () => {
        const testArray = [];
        console.log(testArray);
        const result = tests.arrayToString(testArray);
        expect(result).to.equal('None');
    });
    it('Should return ["Catthew"] when sent ["Catthew"]', () => {
        const testArray = ['Catthew'];
        const result = tests.arrayToString(testArray);
        expect(result).to.equal(testArray);
    });
    it('Should return Catthew\nCatthew when sent ["Catthew", "Catthew"]', () => {
        const testArray = ['Catthew', 'Catthew'];
        const result = tests.arrayToString(testArray);
        expect(result).to.equal('Catthew\nCatthew');
    });
});