const expect = require('chai').expect;
const schedule_info = require('../../../../commands/schedules/schedule_info');

describe('schedule_info.getDate() Test', () => {
    it('Should return December 8', () => {
        let d = new Date();
        d.setMonth(11);
        d.setDate(8);
        const result = schedule_info.getDate(d);
        expect(result).to.equal('December 8');
    });
});