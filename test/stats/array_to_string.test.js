const expect = require('chai').expect;
const {
    tests
} = require('../../commands/stats');

describe('stats.topArrayToString() Test', () => {
    it('should equal Foo: Bar\n', () => {
        const testArray = [{
            name: 'Foo',
            value: 'Bar'
        }];
        const result = tests.arrayToString(testArray, 'value');
        expect(result).to.equal('Foo: Bar\n');
    });
});