/**
 * Node module: mocoolka-tools
 * @copyright © Copyright Mocoolka Corporation 2015,2017.
 * @license  MIT
 */

/** @module mocoolka-watch-file */
const watch = require('watch');

/**
 * watch directory.
 * execute callback function when file change
 * @param {string} path - root path
 * @param {Function} callback - callback function
 * @param {Object} options
 * @property {boolean} options.ignoreDotFiles -
 * When true this option means that when the file tree is walked
 * it will ignore files that being with "."
 * @property {Function} options.filter -  You can use this option to provide a function
 * that returns true or false for each file and directory to decide
 * whether or not that file/directory is included in the watcher.
 * @property {number} options.interval -Specifies the interval duration in seconds,
 * the time period between polling for file changes.
 * @property {regex} options.ignoreDirectoryPattern -When a regex pattern is set,
 * e.g. /node_modules/, these directories are silently skipped.
 * @example
 const { fileTools,  watchFileTools, timerTools }   = require('../src/index.js');

 watchFileTools.watchDirectory(
 fileTools.path(__dirname, 'watch'),
 (event, f, curr, prev)=> {
    console.log(event);
    console.log(f);
    console.log(curr);
  },

 {
   filter: (name) => (
     (fileTools.getFileName(name) === 'test.json')
   ),

   interval: 1,
 });
 */
const watchDirectory = (path, callback, options) => {
  options = options || {};
  watch.createMonitor(path, options, function (monitor) {
    monitor.on('created', function (f, stat) {

      callback('created', f, stat);
    });

    monitor.on('changed', function (f, curr, prev) {

      callback('changed', f, curr, prev);
    });

    monitor.on('removed', function (f, stat) {

      callback('removed', f, stat);
    });
  });

  return watch;
};

module.exports = {
  watchDirectory,
};

