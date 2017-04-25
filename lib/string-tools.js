// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-string */
const md5Source = require('md5');
const memoize = require('lodash/memoize');
const util = require('util');

/**
 * convert message using md5
 * @param {string|buffer|Array}message
 * @param {Object}options encoding:'binary' message type is binary
 * asBytes:true return binary,asString:true return binary to string
 * @return {string|binary}
 */
const md5 = (message, options)=> (
  md5Source(message, options)
);

/**
 * cache md5 result value
 * @param {string|buffer|Array}message
 * @param {Object}options encoding:'binary' message type is binary
 * asBytes:true return binary,asString:true return binary to string
 * @return {string|binary}
 */
const md5Cache = (message, options)=> (
   (memoize(md5))(message, options)
);

/**
 * format message using variable
 * @param {...string|number|json} args
 * @return {string}
 */
const format = (...args)=>(
  util.format.apply(null, args)
);

const fromName = (dbName, camelCase) => {
  if (!dbName) {
    return dbName;
  }

  let parts = dbName.split(/-|_/);
  parts[0] = camelCase ? parts[0].toLowerCase() : capitalize(parts[0]);

  for (let i = 1; i < parts.length; i++) {
    parts[i] = capitalize(parts[i]);
  }

  return parts.join('');
};

const toFileName = (dbName, split) => {
  if (!dbName) {
    return dbName;
  }

  split = split || '-';
  let parts = dbName.split(/(?=[#A-Z])/);
  let result = parts[0].toLowerCase();
  for (let i = 1; i < parts.length; i++) {
    result += split + parts[i].toLowerCase();
  }

  return result;
};

const capitalize = (str) => {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + ((str.length > 1) ? str.slice(1).toLowerCase() : '');
};

const stringTools = {
  md5,
  md5Cache,
  format,
  toFileName,
};

module.exports = stringTools;
