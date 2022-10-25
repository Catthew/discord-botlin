const expect = require('chai').expect;
const stats_info = require('../../../commands/stats/stats_info');

describe('stats.topArrayToString() Test', () => {
    it('should equal damageTaken: 80 (80%)\n', () => {
        const testArray = [{
            name: 'damageTaken',
            damageTaken: '80'
        }];
        const result = stats_info.arrayToString(testArray, 'damageTaken', 100, false);
        expect(result).to.equal('damageTaken: 80 (80%)\n');
    });

    it('should equal redCoins: 3 (3%)\n', () => {
        const testArray = [{
            name: 'redCoins',
            optionalStats: {
                redCoins: 3
            }
        }];
        const result = stats_info.arrayToString(testArray, 'redCoins', 100, true);
        expect(result).to.equal('redCoins: 3 (3%)\n');
    });
});