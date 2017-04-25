// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-type*/
/**
 * Text
 */
class Text{
  constructor(value) {
    this.value = value;
  };

  toObject() {
    return this.value;
  };

  toJSON() {
    return this.toObject();
  };

}

/**
 * Message Class
 * finish i18n function together with i18nTools module
 */
class Message{
  /**
   * create message instance
   * @param {string} id - id
   * @param {Object} [value] - if content config param then messageValue is param value
   * example content: test:"this is {name}" messageValue:{name:'john'}
   * @param {Object}[options] expect language for format message
   */
  constructor(id, value, options, error) {
    // errorTools.paramRequired(id);
    this.id = id;
    this.value = value;
    this.options = options;
    this.error = error;
  };

  toString() {
    let result = '';
    if (isArray(this.value)) {
      this.value.map(item=> {
        result += item.toString() + '\n';
      });
    } else {
      result = `${this.id}: ${this.value ? `${JSON.stringify(this.value)}` : ''}
${this.options ? `options:${this.options}` : ''} `;
    }

    return result;

  };

}



class Any{
  constructor(value) {
    this.value = value;
  };

  toObject() {
    return this.value;
  };

  toJSON() {
    return this.toObject();
  }
}

const promiseExists = typeof Promise === 'function';
const globalObject = typeof window !== 'undefined' ?
  window : typeof global !== 'undefined' ? global : self;
const isDom = 'location' in globalObject && 'document' in globalObject;
const symbolExists = typeof Symbol !== 'undefined';
const mapExists = typeof Map !== 'undefined';
const setExists = typeof Set !== 'undefined';
const weakMapExists = typeof WeakMap !== 'undefined';
const weakSetExists = typeof WeakSet !== 'undefined';
const dataViewExists = typeof DataView !== 'undefined';
const symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
const symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
const setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
const mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
const setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
const mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
const arrayIteratorExists = symbolIteratorExists &&
  typeof Array.prototype[Symbol.iterator] === 'function';
const arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
const stringIteratorExists = symbolIteratorExists &&
  typeof Array.prototype[Symbol.iterator] === 'function';
const stringIteratorPrototype = stringIteratorExists &&
  Object.getPrototypeOf(''[Symbol.iterator]());
const toStringLeftSliceLength = 8;
const toStringRightSliceLength = -1;

/**
 * Types
 * @type {{undefined: string, boolean: string, Boolean: string, number: string,
 *  Number: string, string: string, String: string, symbol: string,
 * function: string, null: string, global: string,
 * Array: string, Location: string, Document: string, MimeTypeArray: string,
 * PluginArray: string, HTMLQuoteElement: string, HTMLTableDataCellElement: string,
 * HTMLTableHeaderCellElement: string, RegExp: string, Date: string,
 * Promise: string, Set: string, Map: string, WeakSet: string, WeakMap: string, DataView: string,
 * MapIterator: string, SetIterator: string, ArrayIterator: string, StringIterator: string,
 * STRING: string[], BOOLEAN: string[], NUMBER: string[], EMPTY: string[]}}
 */
const TYPES = {
  undefined: 'undefined',
  boolean: 'boolean',
  Boolean: 'Boolean',
  number: 'number',
  Number: 'Number',
  string: 'string',
  String: 'String',
  symbol: 'symbol',
  function: 'function',
  null: 'null',
  global: 'global',
  Array: 'Array',
  Object: 'Object',
  Message: 'Message',
  Location: 'Location',
  Document: 'Document',
  MimeTypeArray: 'MimeTypeArray',
  PluginArray: 'PluginArray',
  HTMLQuoteElement: 'HTMLQuoteElement',
  HTMLTableDataCellElement: 'HTMLTableDataCellElement',
  HTMLTableHeaderCellElement: 'HTMLTableHeaderCellElement',
  RegExp: 'RegExp',
  Date: 'Date',
  Promise: 'Promise',
  Set: 'Set',
  Map: 'Map',
  WeakSet: 'WeakSet',
  WeakMap: 'WeakMap',
  DataView: 'DataView',
  MapIterator: 'Map Iterator',
  SetIterator: 'Set Iterator',
  ArrayIterator: 'Array Iterator',
  StringIterator: 'String Iterator',
  STRING: ['string', 'String'],
  BOOLEAN: ['Boolean', 'boolean'],
  NUMBER: ['Number', 'number'],
  EMPTY: ['null', 'undefined'],
};

/**
 * Determines the passed value 'type
 * @param {*}obj -The object to be checked.
 * @return {string} object type
 */
const typeDetect = (obj)=> {

  const typeofObj = typeof obj;

  if (typeofObj !== 'object') {
    return typeofObj;
  }

  if (obj === null) {
    return TYPES.null;
  }

  if (obj === globalObject) {
    return TYPES.global;
  }

  if (Array.isArray(obj)) {
    return TYPES.Array;
  }

  if (isDom) {
    if (obj === globalObject.location) {
      return TYPES.Location;
    }

    if (obj === globalObject.document) {
      return TYPES.Document;
    }

    if (obj === (globalObject.navigator || {}).mimeTypes) {
      return TYPES.MimeTypeArray;
    }

    if (obj === (globalObject.navigator || {}).plugins) {
      return TYPES.PluginArray;
    }

    if (obj instanceof HTMLElement && obj.tagName === 'BLOCKQUOTE') {
      return TYPES.HTMLQuoteElement;
    }

    if (obj instanceof HTMLElement && obj.tagName === 'TD') {
      return TYPES.HTMLTableDataCellElement;
    }

    if (obj instanceof HTMLElement && obj.tagName === 'TH') {
      return TYPES.HTMLTableHeaderCellElement;
    }
  }

  let stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  let objPrototype = Object.getPrototypeOf(obj);

  /*  for (let customerType in customerTypes) {
      if (customerTypes[customerType].prototype === objPrototype) {
        return customerTypes[customerType].name;
      }
    }*/

  if (objPrototype === RegExp.prototype) {
    return TYPES.RegExp;
  }

  if (objPrototype === Date.prototype) {
    return TYPES.Date;
  }

  if (promiseExists && objPrototype === Promise.prototype) {
    return TYPES.Promise;
  }

  if (setExists && objPrototype === Set.prototype) {
    return TYPES.Set;
  }

  if (mapExists && objPrototype === Map.prototype) {
    return TYPES.Map;
  }

  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return TYPES.WeakSet;
  }

  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return TYPES.WeakMap;
  }

  if (dataViewExists && objPrototype === DataView.prototype) {
    return TYPES.DataView;
  }

  if (mapExists && objPrototype === mapIteratorPrototype) {
    return TYPES.MapIterator;
  }

  if (setExists && objPrototype === setIteratorPrototype) {
    return TYPES.SetIterator;
  }

  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return TYPES.ArrayIterator;
  }

  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return TYPES.StringIterator;
  }

  if (objPrototype === null) {
    return TYPES.Object;
  }

  return Object
 .prototype
 .toString
 .call(obj)
 .slice(toStringLeftSliceLength, toStringRightSliceLength);
};

const dataTypeDetect = (obj)=> {
  const typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    if (typeofObj === 'undefined')
      return null;
    return [typeofObj];
  }

  if (obj === null) {
    return null;
  }

  let objPrototype = Object.getPrototypeOf(obj);
  let result = [];
  for (let dataType in dataTypes) {
    if (dataTypes[dataType].prototype === objPrototype) {
      result.push(dataType);
    }
  }

  if (result.length == 0)
  return null;
  return result;
};

const dataTypeValid = (obj, typeName)=> {
  let type = dataTypeDetect(obj);
  if (type === null) {
    if (typeName === null)
      return true;
    else
      return false;
  }

  return type.includes(typeName);
};

const typeValid = (obj, typeName)=> {
  let type = typeDetect(obj);
  return type === typeName;
};

const  customerTypes = {
  Text,
  Any,
  Message,
};
const  baseTypes = {
  String,
  Number,
  Boolean,
  Date,
  Array,
  Buffer,
  Binary: Buffer,
  Object,

};

const initType = ()=> {
  for (let t in customerTypes) {
    registerDataType(customerTypes[t]);
  }

  for (let t in baseTypes) {
    registerDataType(baseTypes[t], [t]);
  }
};

const registerDataType = (type, names)=> {
  names = names || [];
  names = names.concat([type.name]);

  names.map(name=> {
    dataTypes[name.toLowerCase()] = type;
  });
};

const registerCustomerType = (type, names)=> {
  customerTypes[type.name] = type;
  registerDataType(type, names);
};

const dataTypes = {
};
/**
 * Determines whether the passed value is an Array.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Array; otherwise, false.
 */
const isArray = (obj)=> (
   typeDetect(obj) === TYPES.Array
);

/**
 * Determines whether the passed value is an Object.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Object; otherwise, false.
 */
const isObject = (obj)=> (
   typeDetect(obj) === TYPES.Object
);

/**
 * Determines whether the passed value is an Object.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Object; otherwise, false.
 */
const isMessage = (obj)=> (
  typeDetect(obj) === TYPES.Message
);

/**
 * Determines whether the passed value is an Empty.Empty contain null and undefined
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Empty; otherwise, false.
 */
const isEmpty = (obj)=> (
   !!TYPES.EMPTY.includes(typeDetect(obj))
);

/**
 * Determines whether the passed value is an Undefined.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Undefined; otherwise, false.
 */
const isUndefined = (obj)=> (
  typeDetect(obj) === TYPES.undefined
);

/**
 * Determines whether the passed value is an Null.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Null; otherwise, false.
 */
const isNull = (obj)=>(
  typeDetect(obj) === TYPES.null
);

/**
 * Determines whether the passed value is an String.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an String; otherwise, false.
 */
const isString = (obj)=>(
  !!TYPES.STRING.includes(typeDetect(obj))
);

/**
 * Determines whether the passed value is an Number.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Number; otherwise, false.
 */
const isNumber = (obj)=>(
  !!TYPES.NUMBER.includes(typeDetect(obj))
);

/**
 * Determines whether the passed value is an Boolean.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Boolean; otherwise, false.
 */
const isBoolean = (obj)=>(
  !!TYPES.BOOLEAN.includes(typeDetect(obj))
);

/**
 * Determines whether the passed value is an Date.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Date; otherwise, false.
 */
const isDate = (obj)=>(
  typeDetect(obj) === TYPES.Date
);

/**
 * Determines whether the passed value is an Function.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an Function; otherwise, false.
 */
const isFunction = (obj)=> (
  typeDetect(obj) === TYPES.function
);
initType();

const typeTools = {
  dataTypes,
  typeDetect,
  typeValid,
  Text,
  Any,
  Message,
  dataTypeDetect,
  dataTypeValid,
  isArray,
  isObject,
  isEmpty,
  isNull,
  isString,
  isNumber,
  isBoolean,
  isDate,
  isUndefined,
  isMessage,
  isFunction,
  TYPES,
};
module.exports = typeTools;

