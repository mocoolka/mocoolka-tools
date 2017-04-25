// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
const { unitConvertTools } = require('../src/index.js');
let expect = require('chai').expect;

describe('unitConvertTools module', function () {
  it('convert', () => {
    let result = unitConvertTools.convert(7, 'speed-meter-per-second', 'wind-level');
    expect(result).to.be.equal(4);
    result = unitConvertTools.convert(260, 'angle', 'direction');
    expect(result).to.be.equal('W');
  });
});
