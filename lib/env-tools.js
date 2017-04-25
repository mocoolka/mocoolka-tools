// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-env */
/**
 * get language = require(env variable MOCOOLKA_GLOBALIZE_APP_LANGUAGE
 */
const appLanguage = ()=>(
   process.env.MOCOOLKA_GLOBALIZE_APP_LANGUAGE
);

const envTools = {
  appLanguage,
};

module.exports = envTools;
