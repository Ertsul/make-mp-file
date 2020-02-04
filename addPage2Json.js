const chalk = require('chalk');
const util = require('./util');

/**
 * 添加 page/pageName/pageName 路由到 app.json 文件
 * @param {*} pageName 
 * @param {*} filePath 
 */
const addPage2Json = (pageName, filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await util.readFile(filePath, 'utf-8');
      data = JSON.parse(data);
      const route = `pages/${pageName}/${pageName}`;
      if (!data.pages.includes(route)) {
        data.pages.push(route);
        await util.writeFile(filePath, JSON.stringify(data, null, 2));
        resolve(1);
      } else {
        console.log(chalk.red(`:::::::: 页面路由已添加！`));
        resolve(1);
      }
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = addPage2Json;