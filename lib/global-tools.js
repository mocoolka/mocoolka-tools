// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-global */
/**
 * get global .try window and global
 * @return {Object} window | global
 */
const getGlobal = ()=>(
  typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ? global : self
);

/**
 * set key value in global
 * @param {string}key
 * @param {Object}value
 */
const setGlobalItem = (key, value)=> {
  getGlobal()[key] = value;
};

const getGlobalItem = (key) =>(
  getGlobal()[key]
);

const globalTools = {
  getGlobal,
  setGlobalItem,
  getGlobalItem,
};

module.exports = globalTools;
