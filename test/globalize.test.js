import  { assert, should, expect } from 'chai';
import path from 'path';
import winston from 'winston';

import { i18nTools, fileTools , globalTools,configTools }   from '../src/index.js';

//fileTools.setRootDirectory(fileTools.path(fileTools.getCurrentDir(), '..'));

i18nTools.init(null,fileTools.path(__dirname, '..'));
//console.error(globalTools.getGlobal());

//console.log(path.parse(fileTools.path(__dirname,'..','file.config.json')))
try {

  console.log(i18nTools.formatDate(new Date()));
  console.log(i18nTools.formatCurrency(2, 'USD'));
  console.log(i18nTools.plural(3));
  console.log(i18nTools.formatRelativeTime(30000, 'second'));
  console.log(i18nTools.formatUnit(30, 'second'));
  console.log(i18nTools.formatNumber(30000));
  console.log(i18nTools.formatNumber(30000));
  console.log(i18nTools.formatMessage('error/presence'));

  i18nTools.emergency('error/presence');

  i18nTools.alert('error/presence');
  i18nTools.critical('error/presence');
  i18nTools.error('error/presence');
  i18nTools.warning('error/presence');
  i18nTools.notice('error/presence');
  i18nTools.information('error/presence');
  i18nTools.debug('error/presence');

  i18nTools.setLanguage('en');
  console.log(i18nTools.formatDate(new Date()));
  console.log(i18nTools.formatCurrency(2, 'USD'));
  console.log(i18nTools.plural(3));
  console.log(i18nTools.formatRelativeTime(30000, 'second'));
  console.log(i18nTools.formatUnit(30, 'second'));
  console.log(i18nTools.formatNumber(30000));
  console.log(i18nTools.formatNumber(30000));
  console.log(i18nTools.formatMessage('error/presence'));
}
catch (ex){
  console.error(ex);
}

