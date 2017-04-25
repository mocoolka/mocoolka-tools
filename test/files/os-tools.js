const osLocale = require('os-locale');
/**
 * get os language
 * @returns {string}
 */
const getOSLanguage = ()=> {
  let locale = osLocale.sync();
  let lang = locale.substring(0, 2);
  if (lang === 'zh') {
    let region = locale.substring(3);
    if (region === 'CN') return 'zh-Hans';
    if (region === 'TW') return 'zh-Hant';
    if (region === 'Hans') return 'zh-Hans';
    if (region === 'Hant') return 'zh-Hant';
  }

  return lang;
};

/**
 *  get platform
 * @returns {string}
 */
const getPlatform = ()=> (
   process.platform
);

const osTools = {
  getOSLanguage,
  getPlatform,
};

module.exports = osTools;
