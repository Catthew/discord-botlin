const expect = require('chai').expect;
const info = require('../../../commands/info');

describe('info.splitMutlipleSentences() Test', () => {
    it('Should return Foo.\nBar.\n when sent "Foo.Bar."', () => {
        const result = info.splitMutlipleSentences('Foo.Bar.');
        expect(result).to.equal('Foo.\nBar.\n');
    });
});