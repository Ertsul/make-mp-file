const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const dirIfExist = targetPath => {
  return new Promise(async (resolve, reject) => {
    try {
      var stat = fs.statSync(targetPath);
      resolve(stat.isDirectory());
    } catch (error) {
      resolve(false);
    }
  })
}
const getWorkingPath = () => {
  return process.cwd()
}

module.exports = {
  writeFile,
  mkdir,
  dirIfExist,
  getWorkingPath
}