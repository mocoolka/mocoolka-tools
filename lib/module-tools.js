// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT

/** @module mocoolka-tools-module */
let debug = require('debug')('mocoolka-tools');
const fileTools = require('./file-tools.js');
const fs = require('fs');
const md5 = require('md5');
const _  = require('lodash');
const path = require('path');
const assert = require('assert');
/**
 * get module name defined in package.json.
 * @param {string} root module root path
 */
let getModuleName = (root)=> (
   getModuleItem(root, 'name')
);
/**
 * get package version defined in package.json
 * @param {string} root module root path
 */
let getModuleVersion = (root)=> (
   getModuleItem(root, 'version')
);
/**
 * get Modolue item defined in package.json
 * @param {string}root  root module root path
 * @param {string}itemName name defined in package
 * @returns {*}
 */
let getModuleItem = (root, itemName)=> {
  root = root ;
  let item = null;
  try {
    item = require(path.join(root, 'package.json'))[itemName];
  } catch (e) {}

  return item;
};

/**
 * Enumerate all JS files in this application
 * @param {Function}
 *   param.content is a UTF8 string of each JS source file.
 */
const showDotCount = 500;
const showCountCount = 10000;
let enumeratedFilesCount = 0;

/**
 * enumerate Files in sync
 * @param {string}rootDir enumerate Files in root directory
 * @param {Array}blackList path array,path in blackList will skip
 * @param {Array}targetFileType  file will skip when file not in targetFileType
 * @param {boolean}checkNodeModules if true check node_modules
 * @param {Function}callback
 */
const enumerateFilesSync = (rootDir, blackList, targetFileType,  checkNodeModules, callback)=> {
  enumeratedFilesCount = 0;
  let scannedFileNameHash = [];
  assert(rootDir);
  assert(typeof callback === 'function');
  if (checkNodeModules === undefined)
    checkNodeModules = false;

  return enumerateFilesSyncPriv(rootDir, rootDir, blackList, targetFileType,
    checkNodeModules,	scannedFileNameHash, callback);
};

/**
 * if file be scanned,return true,or add to scannedFileNameHash return false
 * @param {string}fileName
 * @param {Array}scannedFileNameHash
 * @returns {boolean}
 */
let fileSyncScanned = (fileName, scannedFileNameHash)=> {
  let realFileName = process.browser ? fileName : fs.realpathSync(fileName);
  let fileNameHash = md5(realFileName);
  if (scannedFileNameHash.indexOf(fileNameHash) >= 0) {
    return true;
  } else {
    scannedFileNameHash.push(fileNameHash);
    return false;
  }
};

const enumerateFilesExcludeDicNames = ['test', 'node_modules', 'coverage'];
/**
 * enumerate file in module.
 * @param {string}currentPath
 * @param {string}rootDir
 * @param {Array}blackList path array,path in blackList will skip
 * @param {Array}targetFileType file will skip when file not in targetFileType
 * @param {boolean}checkNodeModules if true check node_modules
 * @param {Array}scannedFileNameHash
 * @param {Function}callback
 */
const enumerateFilesSyncPriv = (currentPath, rootDir, blackList, targetFileType, checkNodeModules,
  scannedFileNameHash, callback)=> {

  currentPath = path.resolve(currentPath);


  //if file scanned
  if (fileSyncScanned(currentPath, scannedFileNameHash)) {
    return;
  }
  rootDir = path.resolve(rootDir);
  blackList = Array.isArray(blackList) ? blackList : [];
  if (!Array.isArray(targetFileType)) targetFileType = [targetFileType];

  //if currentPath in blackList skip
  let skipDir = false;
  blackList.map(function (part) {
    if (typeof part !== 'string') return;
    if (currentPath.indexOf(part) >= 0) skipDir = true;
  });

  if (skipDir) {

    debug('***  skipping directory:%s', currentPath);
    return;
  }

  let files = null;
  try {
    files = fs.readdirSync(currentPath);

  } catch (e) {
    return;
  }

  //each file in currentPath
  files.map(item=> {
    if (item.indexOf('.') === 0) return;
    let child = path.join(currentPath, item);
    let stats = null;
    try {
      stats = fs.statSync(child);
    } catch (e) {
      return;
    }

    if (stats.isDirectory()) {
      item = item.toLowerCase();
      if (enumerateFilesExcludeDicNames.includes(item))
     return;

      enumerateFilesSyncPriv(child, rootDir, blackList, targetFileType, checkNodeModules,
        scannedFileNameHash, callback);
    } else {
      let fileType = fileTools.getFileExtName(item);
      let fileMKType = fileTools.getMKFileExtName(item);

      //check file type
      if (!targetFileType.includes(fileType) && !targetFileType.includes(fileMKType)) return;
      let content = fileTools.stripBom(fs.readFileSync(child, 'utf8'));
      debug('examining file:%s', child);
      if (checkNodeModules) {
        enumeratedFilesCount++;
        if (enumeratedFilesCount % showDotCount === 0) {
          process.stdout.write('.');
          if (enumeratedFilesCount % showCountCount === 0) {
            process.stdout.write(' ' + enumeratedFilesCount.toString() + '\n');
          }
        }
      }

      callback(content, child);
    };
  });
  if (checkNodeModules) {
    let moduleRootPaths = resolveDependencies(currentPath, rootDir);

    if (moduleRootPaths) {
      moduleRootPaths.map(modulePath=> {

        if (fileTools.IsExceedMaxDirectoryDepth(modulePath, rootDir)){
          return;
        }

        enumerateFilesSyncPriv(modulePath, rootDir, blackList, targetFileType, checkNodeModules,
          scannedFileNameHash, callback);
      });
    }
  }
};

/**
 * resolve module dependencies
 * @param {string}currentDir function process current dictionary
 * @param {string}rootDir function process root dictionary
 * @param {Array}moduleRootPaths
 * @returns {Array}
 */
const resolveDependencies = (currentDir, rootDir, moduleRootPaths)=> {
  moduleRootPaths = moduleRootPaths || [];

  let packageJson = path.join(currentDir, 'package.json');
  let deps = null;
  try {
    //resolve package.json
    deps = require(packageJson).dependencies;
  } catch (e) {
    return null;
  }

  if (deps === undefined || !deps) return null;
  deps = Object.keys(deps);
  if (deps.length === 0) return null;
  deps.map(dep=> {
    let depPath = moduleFileResolve(dep, currentDir, rootDir);
    if (depPath && moduleRootPaths.indexOf(depPath) < 0) {
      moduleRootPaths.push(depPath);
      resolveDependencies(depPath, rootDir, moduleRootPaths);
    }
  });
  moduleRootPaths = _.uniq(_.compact(moduleRootPaths));

  return moduleRootPaths;
};

/**
 * resolve module file
 * @param {string}depName module name
 * @param {string}currentDir
 * @param {string}rootDir
 * @returns {string|null}
 */
const moduleFileResolve = (depName, currentDir, rootDir)=> {
  // simulates npm v3 dependency resolution
  let depPath = null;
  let stats = null;
  try {
    depPath = path.join(currentDir, 'node_modules', depName);
    stats = fs.statSync(depPath);
  } catch (e) {
    stats = null;
    try {
      depPath = path.join(rootDir, 'node_modules', depName);
      stats = fs.statSync(depPath);
    } catch (e) {
      return null;
    }
  }

  if (!stats) return null;
  return fileTools.unsymbolLink(depPath);
};

/**
 * if path is root
 * @param {string} path
 * @returns {boolean}
 */
const isRootModule = (path)=> {
  if (!global.MOCOOLKA_GLB) return false;
  return path === global.MOCOOLKA_GLB.MASTER_ROOT_DIR;
};

const moduleTools = {
  getModuleName,
  getModuleVersion,
  isRootModule,
  enumerateFilesSync,
};

module.exports = moduleTools;

