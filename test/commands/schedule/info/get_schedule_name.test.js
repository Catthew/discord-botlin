const expect = require('chai').expect;
const tests = require('../../../../commands/schedule/schedule_info');

describe('schedule_info.getScheduleName() Test', () => {
    it('Should return December 8', () => {
        const schedule = [{
                name: 'Matt and Jiyoung',
                type: 'Drinks',
                turn: true,
                turnCount: 1
            }
        ];
        const result = tests.getScheduleName(schedule, 'Drinks');
        expect(result).to.equal('Matt and Jiyoung');
    });
});