const expect = require('chai').expect;
const {
    tests
} = require('../../../commands/schedule');

describe('schedule.getTime() Test', () => {
    it('Should return 6:00 PM', () => {
        let d = new Date();
        d.setUTCHours(22, 0, 0 ,0);
        const result = tests.getTime(d);
        expect(result).to.equal('6:00 PM');
    });
});