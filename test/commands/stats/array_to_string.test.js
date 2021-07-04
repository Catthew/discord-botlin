const expect = require('chai').expect;
const {
    tests
} = require('../../../commands/stats');

describe('stats.topArrayToString() Test', () => {
    it('should equal Test: 80 (80%)\n', () => {
        const testArray = [{
            name: 'Test',
            value: '80'
        }];
        const result = tests.arrayToString(testArray, 'value', 100);
        expect(result).to.equal('Test: 80 (80%)\n');
    });
});