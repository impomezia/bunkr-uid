'use strict';

const uid    = require('../index');
const expect = require('chai').expect;


describe('Generate', () => {
  it('generate #1', () => {
    const result = uid.generate();

    expect(result).to.be.a('string');
    expect(result).to.have.length.within(22, 24);
    expect(uid.validate(result)).to.be.true;
  });

  it('generate #2', () => {
    const result = uid.generate(5);

    expect(result).to.be.a('string');
    expect(uid.validate(result)).to.be.true;
  });


  it('make #1', () => {
    const result = uid.make(42);

    expect(result).to.be.a('string');
    expect(uid.validate(result)).to.be.true;
    expect(uid.type(result)).to.be.equal(42);
  });
});


describe('Validate', () => {
  it('valid', () => {
    const tests = ['qEfn2niF1nUxNdfekbu9gv', '38ubRGTTsZjS1BTEtFVDovm', '35sgMUdMSS3QkBgSqXqMPLiS'];

    for (let i of tests) {
      expect(uid.validate(i)).to.be.true;
      expect(uid.type(i)).to.not.equal(0);
    }
  });


  it('invalid', () => {
    const tests = [null, '123', 'qEfn2niF1nUxNdfekbu9gv2n', 'yR-VYTPRQQeMIfQI4i5jw4xp', ''];

    for (let i of tests) {
      expect(uid.validate(i)).to.be.false;
      expect(uid.type(i)).to.be.equal(0);
    }
  })
});
