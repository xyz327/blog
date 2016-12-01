---
title: loopback one
date: 2016-12-01 14:35:20
tags: [loopback]
categories: [loopback]
keywords: loopback
---

loopback是一个用来构建restfulAPI的轻量级的nodejs框架 基于express
[官网](http://loopback.io/) [github](https://github.com/strongloop/loopback/)
<!-- more -->
## 开始
关于基础的安装官网上都有介绍，直接开始
1. ### 新建项目
  ```shell
  slc loopback
  ```
  根据提示一步一步来，我这里选2.x 和api-server
  然后等待下载依赖包就ok了
  **这里npm可能会比较慢，推荐安装[nrm](https://github.com/Pana/nrm)，可以切换npm的源**
2. ### 启动
  ```shell
  slc run
  ```
  然后浏览器进入 [http://localhost:3000/explorer](http://localhost:3000/explorer) 查看相应的restfulAPI
  因为还没有新增model所以页面上是没有相关内容的
3. ### 添加model
