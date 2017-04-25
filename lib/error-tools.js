// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-error */
const typeTools = require('./type-tools.js');
const fileTools = require('./file-tools');
const validTools = require('./validation-tools');
const transformTools = require('./transform-tools');
const iteratorTools = require('./iterator-tools');
const serviceTools = require('./service-tools');

/**
 *  param must can't be blank
 * @param {string|number|Array}param - param will be checked
 * @param {Object} [options]
 * @property {boolean}[options.plain] -true will direct output error or format with message
 */
const paramRequired = (param)=> {
  if (validTools.blank(param)) {
    throwError({
      id: 'ERROR/E-NOT-BLANK',
      value: { path },
    });
  }
};
/**
 * check variable is the type ,throw error if no
 * @param {Object} variable -check variable
 * @param {string}expected - type name
 */
const type = (variable, expected)=> {
  let actual = typeTools.typeDetect(variable);
  if (actual !== expected) {
    throwError({
      id: 'ERROR/E-DIR-NOT-EXIST',
      value: {
        variable,
        expected,
        actual, },
    });
  }
};
/**
 * check directory exist by path ,throw error if not exist
 * @param {string} path -directory path
 */
const directoryNotExist = (path)=> {
  paramRequired(path);
  if (fileTools.directoryExist(path) === false) {
    throwError({
      id: 'ERROR/E-DIR-NOT-EXIST',
      value: { path },
    });
  }
};

/**
 * check file exist by path ,throw error if not exist
 * @param {string} path -file path
 */
const fileNotExist = (path)=> {
  paramRequired(path, 'path');
  if (fileTools.fileExist(path) === false) {
    throwError({
      id: 'ERROR/E-FILE-NOT-EXIST',
      value: { path },
    });
  }
};

/**
 * validate json with schema,throw error if validate fail
 * @param {Object} msg
 */
const validateJsonSchema = (msg)=> {

  validTools.validateJsonSchema(msg, function (errors) {
    if (errors) {
      let messages = [];
      iteratorTools.iterator(errors, (item)=> {
        //console.log(errors);
        let id = `VALIDATE/E-${item.keyword.toUpperCase()}`;
        let params = item.params;
        messages.push({ id, value: params });

      });
      throwError({ id: 'VALIDATE', value: messages });
    }

  });
};

/**
 * throw Error
 * @param {Object}errorObject
 * @property {string} errorObject.id - error id
 * @property {Object} errorObject.value -param value in intl
 */
const throwError = (errorObject) => {
    throw getError(errorObject);
  };

/**
 * throw ERROR/E-MISS-PARSE-FILE error
 * @param {string}path - file path
 */
const throwParseFileError = (path) => (
  throwError({ id: 'ERROR/E-MISS-PARSE-FILE', value: {
    path,
  }, })
);

const getError = (errorObject) => {

    let error = new Error(errorObject.id);
    error.mkMessage = errorObject;

    error.toString = function () {
      let result = `${this.mkMessage.id}:`;
      if (typeTools.isArray(this.mkMessage.value)) {
        this.mkMessage.value.map(item=> {
          result += `${item.id}: ${item.value ? `${JSON.stringify(item.value)}` : ''}
${item.options ? `options:${item.options}` : ''}
 `;
        });
      } else {
        result += ` ${this.mkMessage.value ? `${JSON.stringify(this.mkMessage.value)}` : ''}
${this.mkMessage.options ? `options:${this.mkMessage.options}` : ''} `;
      }

      return result;
    };

    return error;
  };

/**
 * handler Error
 * @param {Object} error - Error instance
 * @param {Function} [callback]
 * @return {boolean} - true if the Error is Trusted; otherwise, false.
 */
const errorHandler = (error, callback) => {
  let messageContent;
  let isTrustedError = false;

  if (error.mkMessage) {
    error.mkMessage.errorLevel = error.mkMessage.errorLevel || 'warning';
    if (error.mkMessage.id === 'I18N.MISS-SYSTEM')
      messageContent = `${error.mkMessage.id}: miss system error message.`;
    else
      messageContent = error.toString();
    try {
      if (!error.mkMessage.stack) {
        error.mkMessage.stack = error.stack;
      }

      serviceTools.standClient('mocoolka-log', 'rfc5424',
        { level: error.mkMessage.errorLevel, message: error.mkMessage,
      }, (error, data)=> {
          if (error)
            console.error(error);
        });
    }
    catch (ex) {
      console.error(ex);
    }

    isTrustedError = errorTools.trustedErrors.includes(error.mkMessage.errorLevel);
  }
  //  console.error(messageContent);
  if (callback)
    callback(messageContent);
  return isTrustedError;
};

const errorTools = {
  trustedErrors: ['error', 'warning'],
  paramRequired,
  directoryNotExist,
  type,
  fileNotExist,
  throwError,
  throwParseFileError,
  errorHandler,
  validateJsonSchema,

};

module.exports = errorTools;
