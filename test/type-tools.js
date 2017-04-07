import typeTools from '../src/lib/type-tools.js';

import  { assert, should, expect } from 'chai';

describe('type-tools', function () {
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
    assert.deepEqual(typeTools.dataTypeDetect(new typeTools.JSON({})), ['json']);
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
    assert.isTrue(typeTools.dataTypeValid(new typeTools.JSON({}), 'json'));
    assert.isTrue(typeTools.dataTypeValid(new typeTools.Any({}), 'any'));
	assert.isTrue(typeTools.dataTypeValid(new typeTools.Message('messageKey'), 'message'));

  });
});

