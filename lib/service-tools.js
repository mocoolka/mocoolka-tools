// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
/** @module mocoolka-tools-service */
const iteratorTools = require('./iterator-tools');
function standPlugin(options) {
  let module = options.module;
  module.initOptions = options;
  if (module.init) {
    this.add('init:standPlugin', module.init);
  }

  if (module.actions) {
    iteratorTools.iterator(module.actions, (obj)=> {
      this.add({ role: module.moduleName, cmd: obj.key }, obj.value);
    });
  }
}

let transport = {
  transport: null,
  listen: { type: 'tcp' },
};

/**
 * start a micro service
 * @param {Object} module - the module as service plug
 * @param {Object}options - service options
 */
function standService(module, options) {
  let seneca = require('seneca')();
  options.module = module;
  if (options.transport && options.listen) {
    seneca.use(options.transport)
      .use(standPlugin, options)
      .listen(options.listen);
    return;
  }

  if (options.transport) {
    seneca.use(options.transport)
      .use(standPlugin, options)
      .listen();
    return;
  }

  if (options.listen) {
    seneca.use(standPlugin, options)
      .listen(options.listen);
    return;
  }

  seneca.use(standPlugin, options)
    .listen();
}

const transportMap = new Map();
transportMap.set('mocoolka-setting', { port: 8081 });
transportMap.set('mocoolka-i18n', { port: 8082 });
transportMap.set('mocoolka-log', { port: 8083 });

/**
 * start services
 * @param {Object} msg - service config
 * @example
 *const settingManager = require('../src/mocoolka-setting.js');
 const { fileTools, serviceTools } = require('../../mocoolka-tools/src/index.js');

 serviceTools.standServices(
 {
   settingManager: {
     module: settingManager,
     options: {
       rootPath: fileTools.path(__dirname, 'files'),
     },
   },
 }
 );
 */
function standServices(msg) {
  let seneca = require('seneca')();
  iteratorTools.iterator(msg, (obj)=> {
    let module = obj.value.module;
    let options = obj.value.options;
    options.module = module;
    let transport = transportMap.get(obj.value.module.moduleName);
    seneca.use(standPlugin, options);
    seneca.listen(transport);
  });

}

/**
 * execute action for service
 * @param {string} moduleName - module name
 * @param {string} action - action name
 * @param {Object}message - action params
 * @param {Function}callback -The callback return result
 * @example
 * serviceTools.standClient('mocoolka-i18n','formatAbbreviations',
 {id:'i18n/E-MISS-MESSAGE',value:{value:'test'}},(error,data)=>{
    if(error)
      console.error(error);
    console.log(data.result)
  });
 serviceTools.standClient('mocoolka-i18n','getSupportedLanguages',
 {},(error,data)=>{
    if(error)
      console.error(error);
    console.log(data.result)
  });
 */
function standClient(moduleName, action, message, callback) {
  let seneca = require('seneca')();
  let transport = transportMap.get(moduleName);

  seneca.client(transport).act({ role: moduleName, cmd: action }, message, callback);
};

/**
 * execute action for service as promise
 * @param {string} moduleName - module name
 * @param {string} action - action name
 * @param {Object}message - action params
 * @return {Object} Promise
 */
const standClientPromise = (moduleName, action, message)=>(
  new Promise(function (resolve, reject) {
    let seneca = require('seneca')();
    let transport = transportMap.get(moduleName);

    seneca.client(transport).act({ role: moduleName, cmd: action }, message, function(error, data){
      if (error)
        reject(error);
      resolve(data);
    });
  })
);

function standUseClient(module, action, message, callback, options) {
  let seneca = require('seneca')();
  options.module = module;
  seneca.use(standPlugin, options).act({ role: module.moduleName, cmd: action }, message, callback);

}

const serviceTools = {
  standClient,
  standClientPromise,
  standService,
  standPlugin,
  standServices,
};

module.exports = serviceTools;
