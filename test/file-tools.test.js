import fileTools from '../lib/file-tools.js';
import  {assert,should,expect} from "chai";

describe("base function", function() {
  it("openFile", function() {
	let result = fileTools.openFile(fileTools.path(__dirname, 'files', 'os-tools.js'));
	assert.equal(typeof result, 'object');
	result = fileTools.openFile(fileTools.path(__dirname, 'files', 'os-tools.js'), null, 'plain');
	assert.equal(typeof result, 'string');
	result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'));
	assert.equal(typeof result, 'object');
	result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'), null, 'plain');
	assert.equal(typeof result, 'string');
	result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.js'), null, 'plain');
	assert.isNull(result)
  });

  it("path", function() {
	let result = fileTools.path(fileTools.getCurrentDir(),'files','package.js');
	assert.equal(typeof result, 'string');
	result = fileTools.pathArray([fileTools.getCurrentDir(),'files','package.js']);
	assert.equal(typeof result, 'string');
	result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'));
	assert.equal(typeof result, 'object');
	result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.json'), null, 'plain');
	assert.equal(typeof result, 'string');
	result = fileTools.openFile(fileTools.path(__dirname, 'files', 'package.js'), null, 'plain');
	assert.isNull(result)
  });

  it("pathArray", function() {
	let result = fileTools.pathArray([fileTools.getCurrentDir(),'files','package.js']);
	assert.equal(typeof result, 'string');
  });

  it("isFullPath", function() {
	let fullPath=fileTools.pathArray([fileTools.getCurrentDir(),'files','package.js']);
	assert.isTrue(fileTools.isFullPath(fileTools.getCurrentDir(),fullPath));
	assert.isFalse(fileTools.isFullPath(fileTools.getCurrentDir(),'package.js'));
  });


})





