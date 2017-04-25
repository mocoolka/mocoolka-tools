// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

const { fileTools, typeTools, errorTools }   = require('../index.js');
const deep = require('deep-diff');

/** @module mocoolka-tools-object */
/**
 * clome object
 * @param {Object}input -cloned object
 * @returns {Object}
 */
let clone = (input)=> {
  let output = input;
  let type = typeOf(input);
  if (type === 'array') {
    output = [];
    let size = input.length;
    input.map(item=> {
      output.push(clone(item));
    });
  } else if (type === 'object') {
    output = {};
    for (let index in input)
      output[index] = clone(input[index]);
  }

  return output;
};
/**
 * Merge two objects recursively
 * @param {Object}base -input
 * @param {Object}extend -extend
 * @return mixed
 */
let mergeRecursiveBasic = (base, extend)=> {
  if (typeOf(base) !== 'object')
    return extend;

  for (let key in extend) {

    if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

      base[key] = mergeRecursiveBasic(base[key], extend[key]);

    } else {
      base[key] = extend[key];
    }

  }

  return base;
};
/**
 * Merge two or more objects
 * @param {boolean}isClone clone
 * @param {boolean} isRecursive
 * @param {Array} args
 * @return object
 */

let mergeBase = (isClone, isRecursive, args)=> {
  if (args.length == 0)
    return {};
  let result = args[0];
  let size = args.length;

  if (isClone || typeOf(result) !== 'object')
    result = {};

  for (let index = 0; index < size; ++index) {
    let item = args[index];
    let type = typeOf(item);

    if (type !== 'object')
      continue;

    for (let key in item) {
      let sitem = isClone ? clone(item[key]) : item[key];
      if (isRecursive) {
        result[key] = mergeRecursiveBasic(result[key], sitem);
      } else {
        result[key] = sitem;
      }
    }
  }

  return result;

};

/**
 * Get type of variable
 * @param {*} input
 * @return string
 *
 * @see http://jsperf.com/typeofvar
 */

let typeOf = (input)=> (
  ({}).toString.call(input).slice(8, -1).toLowerCase()
);

/**
 * merge all input using clone and recursive
 * @param {...Object}args
 */
let merge = (...args)=> (
   mergeBase(true, true, args)
);

/**
 * merge all input object.
 * @param {boolean}isClone -if true use clone
 * @param {boolean}isRecursive - if true use recursive.
 * @param {...Object}args
 */
let mergeAll = (isClone, isRecursive, ...args)=> (
  mergeBase(isClone, isRecursive, args)
);

function* iteratorObject(obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
};

const init = () => {
  Object.defineProperty(Object.prototype, Symbol.iterator, {
    enumerable: false,
    value: function () {
      return objectTools.iteratorObject(this);
    },
  });
  Object.defineProperty(Object.prototype, 'mkMap', {
    enumerable: false,
    value: function (fun) {
      let keys = Object.keys(this);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        fun(key, this[key]);
      }
    },
  });
};

init();


/*if (!Array.prototype.hasOwnProperty('group')) {
  Object.defineProperty(Array.prototype, 'group', {
    enumerable: false,
    value: function(key) {
      var map = {};
      this.map(e => ({k: key(e), d: e})).forEach(e => {
        map[e.k] = map[e.k] || [];
        map[e.k].push(e.d);
      });
      return Object.keys(map).map(k => ({key: k, data: map[k]}));
    }
  });
}*/
const includePropertyName = (object, properName, split)=> {
  split = split || /\/|\./;
  let value = object;
  let parts = properName.split(split);
  parts.map(part=> {
    if (!value[part])
      return false;
    value = value[part];
  });
  return true;
};

const findPropertyValue = (object, properName, split)=> {
  if (typeTools.isEmpty())
  if (!includePropertyName(object, properName, split))
    return null;

  split = split || /\/|\./;
  let value = object;
  let parts = properName.split(split);
  parts.map(part=> {
    if (includePropertyName(value[part])) {

    }
  });
  //if(object[])
  return !!object[properName];
};

/**
 * different values between two object
 * @param {Object}lhs
 * @param {Object}rhs
 * @return {Object}
 */
const diff = (lhs, rhs)=> {
  return deep.diff(lhs, rhs);
};

const objectTools = {
  merge,
  clone,
  mergeAll,
  iteratorObject,
  diff,
};

module.exports = objectTools;
