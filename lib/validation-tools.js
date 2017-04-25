// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-validation */
const  typeTools  = require('./type-tools.js');
const jsonSchemaTools = require('./validate/json-schema-tools');
/**
 * Determines whether the passed value is blank.
 * @param {*} obj -The object to be checked.
 * @return {boolean} -true if the object is an blank; otherwise, false.
 */
const blank = (value)=> {
  if (typeTools.isEmpty(value)) return true;
  if (typeTools.isArray(value) && value.length === 0) return true;
  if (typeTools.isNumber(value) && isNaN(value)) return true;
  if (typeTools.isString(value) && value.trim() === '') return true;
  return false;
};

/**
 * This callback is displayed as part of the validateJsonSchema member.
 * @callback validateJsonSchemaCallback
 * @param {Object} error - Determines whether the function have error.null if no error;
 * @param {boolean} data - true:passed
 */

/**
 * Determines whether the passed message is correct
 * @param {Object} msg -  The object to be checked.
 * @property {Object} msg.schema - json schema
 * @property {Object} msg.data - The data to be checked by schema
 * @param {validateJsonSchemaCallback} callback - return validate result
 * @example
 * const { validationTools } = require('../src/index.js');

 let schema = {
  properties: {
    moduleName: {
      type: 'string',
    },
    moduleDefaultSetting: {
      type: 'object',
      default: {},
    },
  },
  required: ['moduleName', 'moduleDefaultSetting'],
};

 let data = {
  moduleName: 'test',
  moduleDefaultSetting: {
    test: '1',
  },
};

 validationTools.validateJsonSchema({ schema, data }, error=> {
  if (error)
    console.warn(error);
});
 */
const validateJsonSchema = (msg, callback)=> {
  jsonSchemaTools.validate(msg.schema, msg.data, callback);
};

const validateTools = {
  blank,
  validateJsonSchema,
};

module.exports = validateTools;
