import stringTools from '../src/lib/string-tools.js';
import  { assert, should, expect } from 'chai';

describe('base function', function () {
  it('md5', function () {
    let testString = 'mocoolka tools';
    let md5 = stringTools.md5(testString);
    assert.equal(md5, '023c2dd82a2627c77343c392e4e1c243');
    let hash3 = stringTools.md5(md5 + 'a', { encoding: 'binary' });
    assert.equal(hash3, 'fffe271533566cab48423fa52af285ea');
  });

  it('md5Cache', function () {
    let testString = 'mocoolka tools';
    let md5 = stringTools.md5(testString);
    assert.equal(md5, '023c2dd82a2627c77343c392e4e1c243');
    let hash3 = stringTools.md5(md5 + 'a', { encoding: 'binary' });
    assert.equal(hash3, 'fffe271533566cab48423fa52af285ea');
  });

  it('format', function () {
    let testJson = { a: 'a', b: 'b', c: 'c' };
    let testString = 'mocoolka test string: %s ,number: %d ,json:%j';
    let result = stringTools.format(testString, 'string', 1001, testJson);
    assert.equal(result, 'mocoolka test string: string ,number: 1001 ,json:{"a":"a","b":"b","c":"c"}');

  });

});
