// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools */
const fileTools = require('./lib/file-tools.js');
const arrayTools = require('./lib/array-tools.js');
const formatTools = require('./lib/format-tools.js');
const osTools = require('./lib/os-tools.js');
const envTools = require('./lib/env-tools.js');
const moduleTools = require('./lib/module-tools.js');
const globalTools = require('./lib/global-tools.js');
const objectTools = require('./lib/object-tools.js');
const stringTools = require('./lib/string-tools.js');
const errorTools = require('./lib/error-tools.js');
const validTools = require('./lib/validation-tools.js');
const typeTools = require('./lib/type-tools.js');
const jsTools = require('./lib/file/js-tools.js');
const jsonTools = require('./lib/file/json-tools.js');
const ymlTools = require('./lib/file/yml-tools.js');
const transformTools = require('./lib/transform-tools.js');
const unitConvertTools = require('./lib/unit-convert.js');
const watchFileTools = require('./lib/watch-file.js');
const timerTools = require('./lib/timer-tools.js');
const validationTools = require('./lib/validation-tools.js');
const iteratorTools = require('./lib/iterator-tools');
const serviceTools = require('./lib/service-tools');

/**
 * init mocoolka-tools
 * @param {string} root - root path
 * @param {string} [lang] - Language ID.
 *     It tries to use App language OS language, then falls back to 'en'
 */
/*const init = (root, language)=> {
  fileTools.init(root);
  i18nTools.init(root, language);

};*/

/*const errorHandler = () =>{
   logger.logError(err).then(sendMailToAdminIfCritical).then(saveInOpsQueueIfCritical).then(determineIfOperationalError);
  //deciding whether to crash when an uncaught exception arrives
//Assuming developers mark known operational errors with error.isOperational=true, read best practice #3
  process.on('uncaughtException', function(error) {
    errorManagement.handler.handleError(error);
    if(!errorManagement.handler.isTrustedError(error))
      process.exit(1)
  });

  process.on('unhandledRejection', function (reason, p) {
    //I just caught an unhandled promise rejection, since we already have fallback handler for unhandled errors (see below), let throw and let him handle that
    throw reason;
  });
  process.on('uncaughtException', function (error) {
    //I just received an error that was never handled, time to handle it and then decide whether a restart is needed
    errorManagement.handler.handleError(error);
    if (!errorManagement.handler.isTrustedError(error))
      process.exit(1);
  });
}*/
const index = {
  jsTools,
  jsonTools,
  ymlTools,
  fileTools,
  arrayTools,
  formatTools,
  osTools,
  envTools,
  moduleTools,
  globalTools,
  objectTools,
  stringTools,
  errorTools,
  validTools,
  typeTools,
  transformTools,
  unitConvertTools,
  watchFileTools,
  timerTools,
  validationTools,
  iteratorTools,
  serviceTools,
};

module.exports =  index;
