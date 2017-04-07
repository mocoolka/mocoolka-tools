import { fileTools, globalTools } from '../src/index.js';
import  { assert, should, expect } from 'chai';
import path from 'path';

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

  it('path', function () {
    let result = fileTools.path(fileTools.getCurrentDir(), 'files', 'package.js');
    assert.equal(typeof result, 'string');
    result = fileTools.pathArray([fileTools.getCurrentDir(), 'files', 'package.js']);
    assert.equal(typeof result, 'string');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'));
    assert.equal(typeof result, 'object');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'), null, 'plain');
    assert.equal(typeof result, 'string');
    result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.js'), null, 'plain');
    assert.isNull(result);
  });

  it('pathArray', function () {
    let result = fileTools.pathArray([fileTools.getCurrentDir(), 'files', 'package.js']);
    assert.equal(typeof result, 'string');
  });

  it('isFullPath', function () {
    let fullPath = fileTools.pathArray([fileTools.getCurrentDir(), 'files', 'package.js']);
    assert.isTrue(fileTools.isFullPath(fileTools.getCurrentDir(), fullPath));
    assert.isFalse(fileTools.isFullPath(fileTools.getCurrentDir(), 'package.js'));
  });

  it('setRootDirectory || getRootDirectory', function () {
    fileTools.setRootDirectory(fileTools.path(__dirname, '..'));
    assert.equal(fileTools.getRootDirectory(), fileTools.path(__dirname, '..'));
    assert.equal(fileTools.getRootDirectory(), globalTools.getGlobalItem('mocoolka-tools-file').rootDirectory);
  });

  it('getCurrentDir', function () {
    fileTools.setRootDirectory(fileTools.path(__dirname, '..'));
    assert.equal(fileTools.getCurrentDir(), fileTools.path(__dirname, '..'));
    assert.equal(fileTools.getCurrentDir(),
	  globalTools.getGlobalItem('mocoolka-tools-file').currentDirectory);
  });

  it('getToolsModuleDirectory', function () {
    fileTools.setRootDirectory(fileTools.path(__dirname, '..'));
    assert.equal(fileTools.getToolsModuleDirectory(), fileTools.path(__dirname, '..'));
    assert.equal(fileTools.getToolsModuleDirectory(),
	  globalTools.getGlobalItem('mocoolka-tools-file').toolsModuleRootDirectory);
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

  it('getMKFileExtName', function () {
    assert.equal(fileTools.getMKFileExtName(fileTools.path(__dirname, 'file-tools.test.js')), 'test.js');
    assert.isNull(fileTools.getMKFileExtName(fileTools.path(__dirname, 'file-tools.js')));
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

