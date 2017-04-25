// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
/** @module mocoolka-tools-iterator */
const typeTools = require('./type-tools');

/**
 * iterator Object or array
 * @param {Object|Array}obj
 * @param {Function}callback
 */
const iterator = (obj, callback)=> {
  if (typeTools.isArray(obj)) {
    obj.map(value=> {
      callback(value);
    });
  }else if (typeTools.isObject(obj)) {
    Object.keys(obj).map(key=> {
      callback({ key: key, value: obj[key] });
    });
  };
};

const iteratorTools = {
  iterator,
};

module.exports = iteratorTools;
