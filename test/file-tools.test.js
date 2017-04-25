const { fileTools, globalTools } = require('../src/index.js');
const  { assert, should, expect } = require('chai');
const path = require('path');


describe('fileTools module', function () {
  it('openFile', function () {
    let result = fileTools.openFile(fileTools.path(__dirname, 'files', 'os-tools.js'));
    assert.equal(typeof result, 'object');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'os-tools.js'), null, 'plain');
    assert.equal(typeof result, 'string');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'));
    assert.equal(typeof result, 'object');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'), null, 'plain');
    assert.equal(typeof result, 'string');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.js'), null, 'plain');
    assert.isNull(result);
  });

  it('saveFile', function () {

    fileTools.saveFile(fileTools.path(__dirname, 'files', 'test.txt'), 'test');
    expect(fileTools.openFile(fileTools.path(__dirname, 'files', 'test.txt'))).to.be.equal('test');
    fileTools.deleteFile(fileTools.path(__dirname, 'files', 'test.txt'))
    fileTools.saveFile(fileTools.path(__dirname, 'files', 'files','files','test.txt'), 'test');
    expect(fileTools.openFile(fileTools.path(__dirname, 'files', 'files','files','test.txt'))).to.be.equal('test');
    fileTools.deleteDirExist(fileTools.path(__dirname, 'files', 'files'));
  });

  it('path', function () {
    let result = fileTools.path(__dirname, 'files', 'package.js');
    assert.equal(typeof result, 'string');
    result = fileTools.pathArray([__dirname, 'files', 'package.js']);
    assert.equal(typeof result, 'string');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'));
    assert.equal(typeof result, 'object');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'), null, 'plain');
    assert.equal(typeof result, 'string');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.js'), null, 'plain');
    assert.isNull(result);
  });

  it('pathArray', function () {
    let result = fileTools.pathArray([__dirname, 'files', 'package.js']);
    assert.equal(typeof result, 'string');
  });

  it('isFullPath', function () {
    let fullPath = fileTools.pathArray([__dirname, 'files', 'package.js']);
    assert.isTrue(fileTools.isFullPath(__dirname, fullPath));
    assert.isFalse(fileTools.isFullPath(__dirname, 'package.js'));
  });

  it('createDirNotExist | deleteDirExist | directoryExist', function () {
    fileTools.createDirNotExist(fileTools.path(__dirname, 'testDirectory'));
    assert.isTrue(fileTools.directoryExist(fileTools.path(__dirname, 'testDirectory')));
    fileTools.deleteDirExist(fileTools.path(__dirname, 'testDirectory'));
    assert.isFalse(fileTools.directoryExist(fileTools.path(__dirname, 'testDirectory')));

  });

  it('fileExist', function () {
    assert.isTrue(fileTools.fileExist(fileTools.path(__dirname, 'file-tools.test.js')));
    assert.isFalse(fileTools.fileExist(fileTools.path(__dirname, 'testDirectory')));
  });

  it('getFileExtName', function () {
    assert.equal(fileTools.getFileExtName(fileTools.path(__dirname, 'file-tools.test.js')), 'js');
    assert.isNull(fileTools.getFileExtName(fileTools.path(__dirname, 'file-tools')));
  });

  it('getDirectoryName', function () {
    expect(fileTools.getDirectoryName('/test/mk/mocoolka/file-tools.test.js'))
      .to.be.equal('/test/mk/mocoolka');

  });

  it('getMKFileName', function () {
    expect(fileTools.getMKFileName('/test/mk/mocoolka/file-tools.mocoolka.test.js'))
      .to.be.equal('file-tools');

  });

  it('getMKFileExtName', function () {
    expect(fileTools.getMKFileExtName(
      fileTools.path(__dirname, '/test/mk/mocoolka/file-tools.model.test.js')))
      .to.be.equal('model.test.js');
    expect(fileTools.getMKFileExtName(
      fileTools.path(__dirname, '/test/mk/mocoolka/file-tools'))).to.be.null;
    expect(fileTools.getMKFileExtName(null)).to.be.null;
    expect(fileTools.getMKFileExtName(undefined)).to.be.null;
    expect(fileTools.getMKFileExtName([''])).to.be.null;
  });

  it('directoryDepth', function () {
    let v1 = fileTools.directoryDepth(fileTools.path(__dirname, 'test', 'my', 'file-tools.test.js'));
    let v2 = fileTools.directoryDepth(fileTools.path(__dirname, 'file-tools.test.js'));
    assert.equal(v1 - v2, 2);
  });

  it('maxDirectoryDepth', function () {
    assert.equal(fileTools.maxDirectoryDepth(), 99);
  });

  it('isFullPath', function () {
    assert.isTrue(fileTools.isFullPath('f:\\test', 'f:\\test\\r1\\test.js'));
    assert.isFalse(fileTools.isFullPath('f:\\test', '..\\r1\\test.js'));
  });

});

