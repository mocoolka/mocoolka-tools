const typeTools = require('../src/lib/type-tools.js');
const   assert = require('chai').assert;
const expect = require('chai').expect;
describe('type-tools', function () {
  it('typeDetect', function () {
    let value;
    let valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.undefined);
    expect(typeTools.isEmpty(value)).to.be.true;
    expect(typeTools.isUndefined(value)).to.be.true;
    value = new Number(12);
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.Number);
    expect(typeTools.isEmpty(value)).to.be.false;
    expect(typeTools.isNumber(value)).to.be.true;
    value = 12;
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.number);
    expect(typeTools.isEmpty(value)).to.be.false;
    expect(typeTools.isNumber(value)).to.be.true;

    value = new String('123');
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.String);
    expect(typeTools.isString(value)).to.be.true;

    value = '123';
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.string);
    expect(typeTools.isString(value)).to.be.true;

    value = new Boolean(false);
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.Boolean);
    expect(typeTools.isBoolean(value)).to.be.true;

    value = false;
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.boolean);
    expect(typeTools.isBoolean(value)).to.be.true;

    value = new Date();
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.Date);
    expect(typeTools.isDate(value)).to.be.true;

    value = {};
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.Object);
    expect(typeTools.isObject(value)).to.be.true;

    value = null;
    valueType = typeTools.typeDetect(value);
    expect(valueType).to.be.equal(typeTools.TYPES.null);
    expect(typeTools.isNull(value)).to.be.true;
    expect(typeTools.isEmpty(value)).to.be.true;

  });

  it('dataTypeDetect', function () {
    assert.deepEqual(typeTools.dataTypeDetect(12), ['number']);
    assert.deepEqual(typeTools.dataTypeDetect(new Number(12)), ['number']);
    assert.deepEqual(typeTools.dataTypeDetect('string'), ['string']);
    assert.deepEqual(typeTools.dataTypeDetect(new String('string')), ['string']);
    assert.deepEqual(typeTools.dataTypeDetect(true), ['boolean']);
    assert.deepEqual(typeTools.dataTypeDetect(new Boolean(true)), ['boolean']);
    assert.deepEqual(typeTools.dataTypeDetect(new Date()), ['date']);
    assert.deepEqual(typeTools.dataTypeDetect(new Buffer('test')), ['buffer', 'binary']);
    assert.deepEqual(typeTools.dataTypeDetect({}), ['object']);
    assert.deepEqual(typeTools.dataTypeDetect([]), ['array']);
    assert.deepEqual(typeTools.dataTypeDetect(null), null);
    assert.deepEqual(typeTools.dataTypeDetect(undefined), null);
    assert.deepEqual(typeTools.dataTypeDetect(), null);
    assert.deepEqual(typeTools.dataTypeDetect(new typeTools.Text('text')), ['text']);
    assert.deepEqual(typeTools.dataTypeDetect(new typeTools.Any('{}')), ['any']);
    assert.deepEqual(typeTools.dataTypeDetect(new typeTools.Message('OK')), ['message']);

  });

  it('dataTypeValid', function () {
    assert.isTrue(typeTools.dataTypeValid(12, 'number'));
    assert.isFalse(typeTools.dataTypeValid(12, 'string'));
    assert.isTrue(typeTools.dataTypeValid(new Number(12), 'number'));
    assert.isTrue(typeTools.dataTypeValid('string', 'string'));
    assert.isTrue(typeTools.dataTypeValid(new String('string'), 'string'));
    assert.isTrue(typeTools.dataTypeValid(true, 'boolean'));
    assert.isTrue(typeTools.dataTypeValid(new Boolean(true), 'boolean'));
    assert.isTrue(typeTools.dataTypeValid(new Date(), 'date'));
    assert.isTrue(typeTools.dataTypeValid(new Buffer('test'), 'buffer'));
    assert.isTrue(typeTools.dataTypeValid(new Buffer('test'), 'binary'));
    assert.isTrue(typeTools.dataTypeValid({}, 'object'));
    assert.isTrue(typeTools.dataTypeValid([], 'array'));
    assert.isTrue(typeTools.dataTypeValid(null, null));
    assert.isTrue(typeTools.dataTypeValid(undefined, null));
    assert.isTrue(typeTools.dataTypeValid(new typeTools.Text('text'), 'text'));
    assert.isTrue(typeTools.dataTypeValid(new typeTools.Any({}), 'any'));
    assert.isTrue(typeTools.dataTypeValid(new typeTools.Message('messageKey'), 'message'));

  });
});

