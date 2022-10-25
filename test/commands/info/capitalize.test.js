const expect = require('chai').expect;
const info = require('../../../commands/info');

describe('info.capitalize() Test', () => {
    it('Should return Foo Bar when sent "fOo bAr"', () => {
        const result = info.capitalize('fOo bAr');
        expect(result).to.equal('Foo Bar');
    });
});