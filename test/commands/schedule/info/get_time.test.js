const expect = require('chai').expect;
const tests = require('../../../../commands/schedule/schedule_info');

describe('schedule_info.getTime() Test', () => {
    it('Should return 5:00 PM', () => {
        let d = new Date();
        d.setUTCHours(22, 0, 0 ,0);
        const result = tests.getTime(d);
        expect(result).to.equal('5:00 PM');
    });
});