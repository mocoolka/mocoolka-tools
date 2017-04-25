// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
/** @module mocoolka-tools-time*/

/**
 * delay execute function
 * @param {Function}func - The function will execute after delay time
 * @param {number}interval -The time, in milliseconds (thousandths of a second),
 * the timer should wait before the specified function or code is executed.
 * If this parameter is omitted, a value of 0 is used.
 * @param  options -Additional parameters which are passed through
 * to the function specified by func once the timer expires.
 */
const executeDelay = (func, interval, ...options)=> {
  setTimeout(func, interval, ...options);
};

module.exports = {
  executeDelay,
};
