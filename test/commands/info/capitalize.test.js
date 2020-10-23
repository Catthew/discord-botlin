const expect = require('chai').expect;
const {
    tests
} = require('../../../commands/info');

describe('info.capitalize() Test', () => {
    it('Should return Foo Bar when sent "fOo bAr"', () => {
        const result = tests.capitalize('fOo bAr');
        expect(result).to.equal('Foo Bar');
    });
});