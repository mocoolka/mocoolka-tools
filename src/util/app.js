
import  _  from 'lodash';
import fs from  'fs';
import path from 'path';
import util from 'util';
import {fileTools} from '../index.js';
const LANGS = [
  'en', // English
  'zh-Hans', // Chinese (Simplified)
/*  'de', // German
  'es', // Spanish
  'fr', // French
  'it', // Italian
  'pt', // Portuguese
  'ru', // Russian
  'ja', // Japanese
  'ko', // Korean

  'zh-Hant', // Chinese (traditional)
  'ar', // Arabic
  'bn', // Bengali, Bangla
  'cs', // Czech
  'el', // Greek
  'fi', // Finnish
  'hi', // Hindi
  'id', // Indonesian
  'lt', // Lithuanian
  'nb', // Norwegian Bokmål
  'nl', // Dutch
  'pl', // Polish
  'ro', // Romanian
  'sl', // Slovene
  'sv', // Swedish
  'ta', // Tamil
  'te', // Telugu
  'th', // Thai
  'tr', // Turkish
  'uk', // Ukrainian
  'vi', // Vietnamese*/
  // 'af', // Afrikaans
  // 'am', // Amharic
  // 'az', // Azerbaijani
  // 'be', // Belarusian
  // 'bg', // Bulgarian
  // 'bs', // Bosnian
  // 'ca', // Catalan
  // 'cy', // Welsh
  // 'da', // Danish
  // 'et', // Estonian
  // 'eu', // Basque
  // 'fa', // Persian
  // 'fil', // Philippino
  // 'fo', // Faroese
  // 'ga', // Irish
  // 'gl', // Galician
  // 'gu', // Gujarati
  // 'he', // Hebrew
  // 'hr', // Croatian
  // 'hu', // Hungarian
  // 'hy', // Armenian
  // 'is', // Icelandic
  // 'ka', // Georgian
  // 'kk', // Kazakh
  // 'km', // Khmer
  // 'kn', // Kannada
  // 'ky', // Kyrgyz
  // 'lo', // Lao
  // 'lv', // Latvian
  // 'mk', // Macedonian
  // 'ml', // Malayalam
  // 'mn', // Mongolian
  // 'mr', // Marathi (Marāṭhī)
  // 'ms', // Malay
  // 'my', // Burmese
  // 'ne', // Nepali
  // 'pa', // Panjabi, Punjabi
  // 'si', // Sinhalese, Sinhala
  // 'sk', // Slovak
  // 'sq', // Albanian
  // 'sr', // Serbian
  // 'sw', // Swahili
  // 'to', // Tonga (Tonga Islands)
  // 'ur', // Urdu
  // 'uz', // Uzbek
  // 'zu', // Zulu
];
let importCLDR = (dirname, outDirname, languages)=> {
  if (dirname === undefined) {
    dirname = __dirname;
  }

  if (outDirname === undefined)
    outDirname = dirname;
  if (languages === undefined)
    languages = LANGS;
  let cldrVersion = require(path.resolve(dirname,
    'node_modules', 'cldr-data', 'package.json')).version;
  let CLDR = {};
  languages.forEach(function (lang) {
    loadCldr(CLDR, dirname, lang);
  });

  let CLDR_FILE = path.join(outDirname, 'cldr_' + cldrVersion + '.json');
  fs.writeFileSync(CLDR_FILE, JSON.stringify(CLDR));
};

let importCLDRDefault = ()=> {
  fileTools.createDirNotExist(fileTools.path(__dirname, '..', '..', 'cldr'));
  importCLDR(fileTools.path(__dirname, '..', '..'), fileTools.path(__dirname, '..', '..', 'cldr'));
};

let loadCldr = (CLDR, dirname, lang)=> {
  let mainPath = path.join(dirname, 'node_modules',
    'cldr-data', 'main', '%s');
  let bundleCa = path.join(mainPath, 'ca-gregorian');
  let bundleCurrencies = path.join(mainPath, 'currencies');
  let bundleDates = path.join(mainPath, 'dateFields');
  let bundleNumbers = path.join(mainPath, 'numbers');

  CLDR = _.merge(CLDR, require(util.format(bundleCa, lang)));
  CLDR = _.merge(CLDR, require(util.format(bundleCurrencies, lang)));
  CLDR = _.merge(CLDR, require(util.format(bundleDates, lang)));
  CLDR = _.merge(CLDR, require(util.format(bundleNumbers, lang)));
  CLDR = _.merge(CLDR, require(util.format(path.join(mainPath, 'timeZoneNames'), lang)));
  CLDR = _.merge(CLDR, require(util.format(path.join(mainPath, 'units'), lang)));
  if (lang === 'en') {
    let supplementalPath = path.join('cldr-data', 'supplemental');
    let likelySubtags = require(path.join(supplementalPath, 'likelySubtags'));
    CLDR = _.merge(CLDR, likelySubtags);
    CLDR = _.merge(CLDR, require(path.join(supplementalPath, 'plurals')));
    CLDR = _.merge(CLDR, require(path.join(supplementalPath, 'ordinals')));
    CLDR = _.merge(CLDR, require(path.join(supplementalPath, 'numberingSystems')));

    CLDR = _.merge(CLDR, require(path.join(supplementalPath, 'timeData')));
    CLDR = _.merge(CLDR, require(path.join(supplementalPath, 'weekData')));
    CLDR = _.merge(CLDR, require(path.join(supplementalPath, 'currencyData')));
  }
};

export default importCLDR;
importCLDRDefault();
