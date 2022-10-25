const expect = require('chai').expect;
const schedule_info = require('../../../../commands/schedules/schedule_info');

describe('schedule_info.getTime() Test', () => {
    it('Should return 6:00 PM', () => {
        let d = new Date();
        d.setUTCHours(22, 0, 0 ,0);
        const result = schedule_info.getTime(d);
        expect(result).to.equal('6:00 PM');
    });
});