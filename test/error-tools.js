const typeTools = require('../src/lib/type-tools.js');

const  { assert, should, expect } = require('chai');

describe('error-tools', function () {
  it('typeDetect', function() {
    let value;
    let valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.undefined);
  });
});
