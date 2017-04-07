import objectTools from '../src/lib/object-tools.js';
import  { assert, should, expect } from 'chai';

describe('objectTools function', function () {
  it('clone', function () {
    let a = {
      value: 4,
    };
    let b = {
      value: 7,
    };
    let o = {
      a,
      b,
    };
    let c = objectTools.clone(o);
    a.value = 8;
    assert.equal(c.a.value, 4);
  });

  it('merge', function () {
    let a = {
      value: 4,
    };
    let b = {
      value: 7,
    };
    let o = {
      a,
      b,
    };
    let c = objectTools.merge(o, a, b);
    let m = objectTools.mergeAll(false, false, o, a, b);
    assert.equal(c.value, 7);
    assert.equal(c.a.value, 4);
    assert.equal(m.value, 7);
    assert.equal(m.a.value, 4);
    a.value = 8;
    assert.equal(c.a.value, 4);
    assert.equal(m.a.value, 8);

  });
});
