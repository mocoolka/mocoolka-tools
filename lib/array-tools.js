// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
//let { errorTools } = require('./error-tools.js');
/** @module mocoolka-tools-array */
/**
 * create array = require(source array with order
 * @param {Array} source source array
 * @param {number}order  the number to begin retrieve
 * @returns {Array}
 */
let getArrayFromArrayByOrder = (source, order)=> {
  if (!Array.isArray(source))
    return [];
  let argsLength = source.length;
  if (order >= argsLength) return [];
  let output = [];
  for (let ix = order; ix < argsLength; ix++) {
    output.push(source[ix]);
  }

  return output;
};
/**
 * get uniqueness Array
 * @param {Array}source
 * @return {Array}
 */
const uniquenessArray = (source)=> {
  /* errorTools.paramRequired(source);
   errorTools.type(source, 'Array');*/
  return [...new Set(source)];
};

const arrayTools = {
  getArrayFromArrayByOrder,
  uniquenessArray,
};

module.exports = arrayTools;

