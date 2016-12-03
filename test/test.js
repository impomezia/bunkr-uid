'use strict';

const uuid   = require('../index');
const expect = require('chai').expect;


describe('Generate', () => {
  it('generate #1', () => {
    const result = uuid.generate();

    expect(result).to.be.a('string');
    expect(result).to.have.length.within(22, 24);
    expect(uuid.validate(result)).to.be.true;
  });

  it('generate #2', () => {
    const result = uuid.generate(5);

    expect(result).to.be.a('string');
    expect(uuid.validate(result)).to.be.true;
  });
});


describe('Validate', () => {
  it('valid', () => {
    const tests = ['qEfn2niF1nUxNdfekbu9gv', '38ubRGTTsZjS1BTEtFVDovm', '35sgMUdMSS3QkBgSqXqMPLiS'];

    for (let i of tests) {
      expect(uuid.validate(i)).to.be.true;
    }
  });


  it('invalid', () => {
    const tests = [null, '123', 'qEfn2niF1nUxNdfekbu9gv2n', 'yR-VYTPRQQeMIfQI4i5jw4xp'];

    for (let i of tests) {
      expect(uuid.validate(i)).to.be.false;
    }
  })
});
