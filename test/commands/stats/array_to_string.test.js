const expect = require('chai').expect;
const tests = require('../../../commands/stats/stats_info');

describe('stats.topArrayToString() Test', () => {
    it('should equal Test: 80 (80%)\n', () => {
        const testArray = [{
            name: 'Test',
            value: '80'
        }];
        const result = tests.arrayToString(testArray, 'value', 100, false);
        expect(result).to.equal('Test: 80 (80%)\n');
    });

    it('should equal Test: 3 (3%)\n', () => {
        const testArray = [{
            name: 'Test',
            optionalStats: {
                redCoins: 3
            }
        }];
        const result = tests.arrayToString(testArray, 'redCoins', 100, true);
        expect(result).to.equal('Test: 3 (3%)\n');
    });
});