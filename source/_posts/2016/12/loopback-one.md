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
~~~安装slc工具~~~ 官网现在使用loopback-cli代替了原来的slc

关于基础的安装官网上都有介绍，直接开始
### 新建项目
  ```shell
  lb
  #输入项目名,选择版本，选择对应的模板，一个loopback项目就已经创建好了。
  ```
我选择的是`3.x`版和 `api-server`的模板

  然后等待下载依赖包就ok了
  **这里npm可能会比较慢，推荐安装[nrm](https://github.com/Pana/nrm)，可以切换npm的源**
### 启动
  ```shell
  node .
  ```
  然后浏览器进入 [http://localhost:3000/explorer](http://localhost:3000/explorer) 查看相应的restfulAPI
  会有一个默认的User

一个loopback项目的目录结构如下
```

loopback-demo
|
|--client //存放静态文件
|
|--common
|   |
|   |--mixins //mixins的相关Model
|   |--models //公共的model
|
|--server
|   |
|   |--boot //项目启动时会加载这个目录下的文件
|   |--models //服务器的model
|   |--component-config.js // 
|   |--config.js //loopback配置文件
|   |--datasources.js //数据源设置
|   |--middleware.js //中间件设置
|   |--model-config.js //model定义
|   |--server.js //启动文件
|
```
创建一个用户管理的restfulApi程序

### 新建BaseUser模型
```shell
lb model 
#根据提示创建一个名为BaseUser的模型 继承自User
```
`User`模型为loopback内置的用户模型，包含了login/logout/accesstoken等方法属性，我们自己的用户模型自己继承与它就行

### 新建File模型

`PersistedModel`模型为内置的包含CRUD的存储模型