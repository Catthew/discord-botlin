const expect = require('chai').expect;
const tests = require('../../../../commands/schedule/schedule_time');

describe('schedule_time.serverOffset() Test', () => {
    it('Should return 9', () => {
        const hour = 4;
        const result = tests.serverOffset(hour);
        expect(result).to.equal(9);
    });
});