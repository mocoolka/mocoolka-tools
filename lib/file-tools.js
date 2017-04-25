// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-file */
const mkDirP = require('mkdirp');
const pathSource = require('path');
const fs = require('fs');
const jsTools = require('./file/js-tools.js');
const jsonTools = require('./file/json-tools.js');
const ymlTools = require('./file/yml-tools.js');
const typeTools = require('./type-tools.js');


// default config
let config = {
  moduleName: 'mocoolka-tools-file',
  initFunction: 'init',
  rootDirectory: null,
  currentDirectory: null,
  toolsModuleRootDirectory: null,
  maxDirectoryDepth: 99,
};

let INITCONFIG = false;

/**
 * get config value
 * @param {string} item - property name in config
 * @return {null|Object|string}
 */
/*const getConfigValue = (item) => {
  errorTools.notInit(INITCONFIG, { moduleName: config.moduleName,
    initFunction: config.initFunction, });
  return configTools.getConfig(config.moduleName, item);
};*/

/*const init = (root) => {
  errorTools.directoryNotExist(root);
  configTools.setConfig(config.moduleName, config, { rootDirectory: root,
    currentDirectory: process.cwd(),
    toolsModuleRootDirectory: path(__dirname, '..', '..'),
  });
  INITCONFIG = true;
};*/

/**
 * get current directory
 * @return {string}
 */
/*const getCurrentDir = ()=> (
  getConfigValue('currentDirectory')
);*/
/**
 * get root directory
 * @return {string}
 */
/*const getRootDirectory = () => (
  getConfigValue('rootDirectory')
);*/
/**
 * get tools module directory
 */
/*const getToolsModuleDirectory = () => (
  getConfigValue('toolsModuleRootDirectory')
);*/

/**
 * create directory if directory not exist
 * @param {string}dir
 */
const createDirNotExist = (dir)=> {
  if (!directoryExist(dir)) {
    mkDirP.sync(dir);
  }
};

/**
 * delete directory if directory exist and even directory contain files
 * @param {string}path
 */
const deleteDirExist = (path)=> {
  if (directoryExist(path)) {
    fs.readdirSync(path).forEach((file, index)=> {
      let curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteDirExist(curPath);
      } else { // delete file
        deleteFile(curPath);
      }
    });

    fs.rmdirSync(path);
  }

};

/**
 * if file exist
 * @param {string} path
 * @return {boolean}
 */
const fileExist = (path)=> {
  let fileStats;
  let validPath = true;
  try {
    fileStats = fs.statSync(path);
  } catch (e) {
    validPath = false;
  }

  if (validPath === false)
    return false;
  if (!fileStats.isFile())
    return false;
  return true;

};

/**
 * if file exist
 * @param {string} dirPath
 * @return {boolean}
 */
const directoryExist = (dirPath)=> {
  let rootStats;
  let validPath = true;
  try {
    rootStats = fs.statSync(dirPath);
  } catch (e) {
    validPath = false;
  }

  if (validPath === false)
    return false;
  return rootStats.isDirectory();

};

/**
 * Returns ext name of file name.
 * @param {string} path file fullName that contain path
 * @return {string|null}
 */
let getFileExtName = (path)=> {
  if (typeof path !== 'string') return null;
  let name = pathSource.parse(path).base;
  let parts = name.split('.');
  if (parts.length < 2) return null;
  return parts[parts.length - 1].toLowerCase();
};

let getDirectoryName = (path)=> {
  if (typeof path !== 'string') return null;
  return pathSource.parse(path).dir;

};

/**
 * Returns  name of file name. the name is  name before first dot
 * @param {string} path file fullName that contain path
 * @return {string|null}
 */
let getMKFileName = (path)=> {
  if (typeof path !== 'string') return null;
  let name = pathSource.parse(path).base;
  if (typeof name !== 'string') return null;
  let parts = name.split('.');
  if (parts.length === 0) return null;
  return parts[0];
};

/**
 * Returns  name of file name.
 * @param {string} path file fullName that contain path
 * @return {string|null}
 */
let getFileName = (path)=> {
  if (typeof path !== 'string') return null;
  let name = pathSource.parse(path).base;
  return name;
};
/**
 * Returns  mk ext name of file name.
 * @param {string} path file fullName that contain path
 * @return {string|null}
 */
let getMKFileExtName = (path)=> {
  if (typeof path !== 'string') return null;
  let name = pathSource.parse(path).base;
  let parts = name.split('.');
  if (parts.length < 2) return null;
  let extName = parts[1].toLowerCase();
  for (let i = 2; i < parts.length; i++) {
    extName += '.' + parts[i].toLowerCase();
  }

  return extName;
};

/**
 * open file as string or object
 * @param {string}path - file path
 * @param {string}type - if null then use path parse
 * @param {string}mode - if mode not equal 'object' parse using string
 * @returns {string|Object}
 */
const openFile = (path, type, mode)=> {
  if (!fileExist(path))
    return null;
  type = type || getFileExtName(path);
  let result;
  if (type === 'js')
    result = jsTools.open(path, mode);
  else if (type === 'json')
    result = jsonTools.open(path, mode);
  else if (type === 'yml' || type === 'yaml')
    result = ymlTools.open(path, mode);
  else
    result = openFileAsPlainString(path);
  return result;
};

/**
 * open file and return string
 * @param {string} path - file path
 * @return {string} file content
 */
const openFileAsPlainString = (path)=>(
  fs.readFileSync(path, 'utf8')
);

/**
 * save file to path
 * @param {string} path
 * @param {string|Object}content
 */
const saveFile = (path, content)=> {

  createDirNotExist(getDirectoryName(path));
  let type =  getFileExtName(path);
  let result;
  if (type === 'json' && (typeTools.typeDetect(content) === 'Object'
    || typeTools.typeDetect(content) === 'Array'))
    content = JSON.stringify(content);
  fs.writeFileSync(path, content);
};

/**
 * delete file with file path
 * @param {string} path - file path
 */
const deleteFile = (path)=> {
  fs.unlinkSync(path);
};

/**
 * return string that remove Bom = require(input string
 * @param {string}str
 * @returns {string}
 */
const stripBom = (str)=> (
   str.charCodeAt(0) === 0xFEFF ? str.slice(1) : str
);

/**
 * calculate path depth
 * @param {string}fullPath path
 * @returns {number}
 */
const directoryDepth = (fullPath)=> {

  fullPath = pathSource.normalize(fullPath);
  return fullPath.split(pathSource.sep).length;
};

/**
 * get real path
 * @param {string}path
 * @return {string|null}
 */
const realPath = (path)=> {
  let realPath = null;
  try {
    realPath = process.browser ? path : fs.realpathSync(path);
  } catch (e) {
    return null;
  }

  return realPath;
};

/**
 * if path is symbol link ,return real path
 * @param {string}path
 * @returns {string|null}
 */
const unsymbolLink = (path)=> {
  if (!path) return null;
  let stats = null;
  try {
    stats = fs.lstatSync(path);
  } catch (e) {
    return null;
  }

  if (!stats) return null;
  if (stats.isSymbolicLink()) {
    let realPath = fileTools.realPath(path);

    return unsymbolLink(realPath);
  } else {
    return stats.isDirectory() ? path : null;
  }
};

/**
 * get max directory depth
 * @returns {number}
 */
const maxDirectoryDepth = ()=> {
  let depth = parseInt(process.env.MOCOOLKA_GLOBALIZE_MAX_DEPTH, 10);
  if (isNaN(depth)) depth = fileTools.MAX_DIRECTORY_DEPTH;
  depth = Math.max(1, depth);
  return depth;
};

/**
 * if the depth that current directory in root directory
 * more than max directory depth return true
 * @param {string}currentDir
 * @param {string} rootDir
 * @returns {boolean}
 */
const IsExceedMaxDirectoryDepth = (currentDir, rootDir)=> {
  let depthRoot = directoryDepth(rootDir);

  let depthCurrent = directoryDepth(currentDir);
  if ((depthCurrent - depthRoot) > maxDirectoryDepth())
    return true;
  else
    return false;
};

/**
 *  joins all given path segments together using the platform specific separator
 *  as a delimiter, then normalizes the resulting path.
 * @param {...string}args  A sequence of path segments
 */
const path = (...paths)=> (
  pathSource.join.apply(null, paths)
);

/**
 *  path with array
 * @param {Array}paths - A sequence of path segments
 */
const pathArray = (paths)=> (
  pathSource.join.apply(null, paths)
);

/**
 * if path in root is full path return true,or return false
 * @param {string} rootPath
 * @param {string} fullPath
 * @return {boolean}
 */
const isFullPath = (rootPath, fullPath)=>(

   pathSource.resolve(rootPath, fullPath) === fullPath
);

let fileTools = {
  moduleName: 'mocoolka-tools-file',
  MAX_DIRECTORY_DEPTH: 99,
  createDirNotExist,
  deleteDirExist,
  getFileExtName,
  getMKFileExtName,
  deleteFile,
  directoryDepth,
  realPath,
  unsymbolLink,
  maxDirectoryDepth,
  IsExceedMaxDirectoryDepth,
  stripBom,
  openFile,
  openFileAsPlainString,
  fileExist,
  path,
  pathArray,
  isFullPath,
  directoryExist,
  getMKFileName,
  getFileName,
  getDirectoryName,
  saveFile,
};
module.exports = fileTools;

