import { configTools, fileTools, globalTools } from '../src/index.js';
let assert = require('chai').assert;
let should = require('chai').should();
let expect = require('chai').expect;

describe('config-tools module', function () {
  it('init', function () {
    let appConfig = configTools.init(fileTools.path(__dirname, 'files'));
    expect(appConfig.test.item1).to.be.equal('app-item1');
    expect(appConfig.test.item2).to.be.equal('app-item2');
    expect(globalTools.getGlobalItem(configTools.moduleName).filePath)
      .to.be.equal(fileTools.path(__dirname, 'files'));
  });

  it('getAppConfig', function () {
    let appConfig = configTools.init(fileTools.path(__dirname, 'files'));
    let testConfig = configTools.getAppConfig('test');
    expect(testConfig.item1).to.be.equal('app-item1');
    expect(testConfig.item2).to.be.equal('app-item2');
  });

  it('setConfig | getConfig', function () {
    let appConfig = configTools.init(fileTools.path(__dirname, 'files'));
    let testConfig = configTools.setConfig('test',
      { item1: 'item1', item2: 'item2', item3: 'item3' }, { item1: 'uitem1' });
    expect(testConfig.item1).to.be.equal('uitem1');
    expect(testConfig.item2).to.be.equal('app-item2');
    expect(testConfig.item3).to.be.equal('item3');
    let testGetConfig = configTools.getConfig('test');
    expect(testGetConfig.item1).to.be.equal('uitem1');
    expect(testGetConfig.item2).to.be.equal('app-item2');
    expect(testGetConfig.item3).to.be.equal('item3');
    let testGlobalConfig = globalTools.getGlobalItem('test');
    expect(testGlobalConfig.item1).to.be.equal('uitem1');
    expect(testGlobalConfig.item2).to.be.equal('app-item2');
    expect(testGlobalConfig.item3).to.be.equal('item3');
  });

});
