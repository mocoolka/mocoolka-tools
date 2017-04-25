// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-file-yml */
const yml = require('yamljs');
const fs = require('fs');
/**
 * open yml file
 * @param {string}path - file path
 * @param {string}mode -if mode is 'object' return object else return string
 * @returns {Object|string}
 */
const open = (path, mode)=> {
  mode = mode || 'object';
  if (mode === 'object')
    return yml.parse(fileTools.openFileAsPlainString(path));
  else
    return openFileAsPlainString(path);
};

/**
 * open file and return string
 * @param {string} path - file path
 * @return {string} file content
 */
const openFileAsPlainString = (path)=>(
  fs.readFileSync(path, 'utf8')
);
const ymlTools = {
  open,
};

module.exports = ymlTools;
