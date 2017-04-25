// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-format */
/**
 * map format args to array by params in path that contain %s %d %j
 * @param {string}path string that contain param
 * @param {Array}args will replace param
 * @returns {Array}
 */
const mapArgs = (path, args)=> {
  let ix = 1;
  let output = [];
  path.replace(/\%[sdj\%]/g, function (match) {
    if (match === '%%') return;
    let arg = args[ix++];
    if (arg === undefined) arg = 'undefined';
    if (arg === null) arg = 'null';
    output.push((match === '%j') ?
      JSON.stringify(arg) : arg.toString());
  });

  return output;
};

/**
 * %replace %s with {N} where N=0,1,2,...
 * @param {string}msg
 * @return {*|void|string|XML}
 */
let mapPercent = (msg)=> {
  let ix = 0;
  return msg.replace(/\%[sdj\%]/g, function (match) {
    if (match === '%%') return '';
    let str = '{' + ix.toString() + '}';
    ix++;
    return str;
  });

};

/**
 * if %s %d %j is included in the string return true
 * @param {string}msg string checked
 * @return {boolean}
 */
let retrievePercentSymbol = (msg)=> (
   /\%[sdj\%]/.test(msg)
);

const formatTools = {
  mapArgs,
  mapPercent,
  retrievePercentSymbol,
};

module.exports = formatTools;
