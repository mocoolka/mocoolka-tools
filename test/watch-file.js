const { watchFileTools, fileTools, timerTools } = require('../src/index.js');
let assert = require('chai').assert;
let should = require('chai').should();
let expect = require('chai').expect;

describe('watchFileTools module', function () {
  this.timeout(12000);
  it('watchDirectory', (done) => {

    setTimeout(done, 10000);

    let languages = watchFileTools.watchDirectory(fileTools.path(__dirname, 'watch'),
      (state, file, curr, pre)=> {
        expect(['created', 'changed']).to.include(state);
        done();
      }, { interval: 1 });
    let json = { test: 'test' };

    //  let json1={test:'test2'};
    timerTools.executeDelay(fileTools.saveFile, 1000, fileTools.path(__dirname, 'watch', 'test.json'), json);
    fileTools.saveFile(fileTools.path(__dirname, 'watch', 'test.json'), json);

  });

});
