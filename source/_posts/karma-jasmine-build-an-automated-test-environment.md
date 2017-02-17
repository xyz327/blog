---
title: 用karma+jasmine构建自动化测试环境
date: 2017-02-17 11:28:26
tags: [test karma jamine]
categories: [test]
keywords: [测试 karma jasmine]
---
使用karma+jasmine 构建前端自动化测试环境

在项目下先安装karma 和 jasmine
```shell
npm install karma karma-jasmine karma-chrome-launcher --save-dev
```
安装karma的命令行
```shell
npm install karma-cli -g
```

在项目跟路径下初始化karma
```shell
karma init
```
需要选择初始化的选项，根据自己的需要设置初始化的设置(会生成一个karma.conf.js)

安装karma-coverage 生成代码覆盖率报告
```shell
npm install karma-coverage --save-dev
```
安装karma-coverage后需要在karma.conf.js 添加相应的配置信息

安装完成后，编写源文件以及相对应的测试文件

开始执行测试(会打开chrome 修改了源文件或测试文件后会自动重新执行测试)
```shell
karma start karma.conf.js
```

karma.conf.js 具体内容
```javascript
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    // 要测试的源文件与测试文件的路径
    files: [
      'client/sdk/dist/*.js',
      'spec/**/*[sS]pec.js'
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // 使用karma-coverage 生成对对应的源文件的 覆盖率报告
    preprocessors: {
      'client/sdk/dist/admin.js':'coverage'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],
    // karma-coverage 生成报告的设置
    coverageReporter: {
      type : 'html',
      dir : 'spec/reporter/coverage/'
    },
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
```
