// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-file-json */
const fs = require('fs');

/**
 * open json file
 * @param {string}path - file path
 * @param {string}mode -if mode is 'object' return object else return string
 * @returns {Object|string}
 */
const open = (path, mode)=> {
  mode = mode || 'object';
  if (mode === 'object')
    return require(path);
  else
    return openFileAsPlainString(path);
};

const jsonTools = {
  open,
};

/**
 * open file and return string
 * @param {string} path - file path
 * @return {string} file content
 */
const openFileAsPlainString = (path)=>(
  fs.readFileSync(path, 'utf8')
);
module.exports = jsonTools;
