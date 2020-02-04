#! /usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const program = require('commander');
const util = require('./util.js');
const addPage2Json = require('./addPage2Json.js');

// 命令行参数
program
  .version('1.0.0')
  .option('-t, --type <type>', '组件 or 页面', '')
  .option('-n, --name <name>', '名称', '')
  .action(async cmd => {
    try {
      const {
        type = '',
        name = ''
      } = program;
      console.log(chalk.blue(`:::::::: 文件类型：${type}`));
      console.log(chalk.blue(`:::::::: 文件名称：${name}`));
      if (!type) {
        console.log(chalk.red(':::::::: 文件类型不能为空!'));
        return;
      }
      if (!name) {
        console.log(chalk.red(':::::::: 文件名称不能为空!'));
        return;
      }
      const working = util.getWorkingPath();
      const dirPath = path.resolve(working, 'src', `${type}s`, name); // 目标目录
      const dirPromiseRes = await util.dirIfExist(dirPath);
      if (dirPromiseRes) {
        console.log(chalk.green(':::::::: 文件目录已存在!', util.dirIfExist(dirPath)));
        return;
      }
      await util.mkdir(dirPath);
      // wxml 文件
      const wxmlPath = path.resolve(dirPath, name + '.wxml');
      // less 文件
      const lessPath = path.resolve(dirPath, name + '.less');
      // json 文件
      const jsonPath = path.resolve(dirPath, name + '.json');
      // js 文件
      const jsPath = path.resolve(dirPath, name + '.js');
      // app.json 文件
      const appJsonPath = path.resolve(working, 'src', 'app.json');
      // js 文件内容
      const jsContent = type === 'page' ?
        'Page({})' :
        'Component({})';
      // json 文件内容
      const jsonContent = type === 'page' ?
        '{}' :
        '{"component": true}';
      let pArr = [
        util.writeFile(wxmlPath, ''),
        util.writeFile(lessPath, ''),
        util.writeFile(jsonPath, jsonContent),
        util.writeFile(jsPath, jsContent),
      ];
      type === 'page' && pArr.push(addPage2Json(name, appJsonPath));
      const pRes = await Promise.all(pArr);
      console.log(chalk.blue(':::::::: 完成！'));
    } catch (error) {
      console.log(chalk.red(error));
    }
  })
  .parse(process.argv);