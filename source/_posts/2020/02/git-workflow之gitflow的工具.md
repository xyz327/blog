---
title: git-workflow之gitflow的工具
permalink: git-workflow之gitflow的工具
tags:
  - git
  - git-flow
categories:
  - git
keywords: 'null'
toc: true
date: 2020-02-26 16:51:01
---

gitflow 只是一套规范在使用时也无非是使用git的命令来完成gitflow定义的分支事情,但是使用原始的git命令行太麻烦也容易出错,于是就有了gitflow的工具

## gitflow命令行工具
为git命令行添加gitflow的动作命令.简化使用的难度

### 安装
详细信息参考[官方文档](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation)
1. Liunx （Debian）
```bash
# Ubuntu 18.04
apt-get install git-flow
```
2. windows
- git-for-windows  
  2.6.4 以上就内置了
- 在cygwin中安装
  ```bash
  // 在git-bash中执行
  wget -q -O gitflow-installer.sh --no-check-certificate 
  https://raw.githubusercontent.com/petervanderdoes/gitflow/develop/contrib/gitflow- 
  installer.sh
  ```
  ```bash
  # 如果提示没有权限 先授权
  # chmod +x gitflow-installer.sh
  # state 可选值为  stable / develop 
  ./gitflow-installer.sh install <state>
  ```
3. MacOS
```bash
brew install git-flow-avh
```
### 使用
git-flow 提供 init,featrue,hotfix,release等命令
![o_gitflowcommands.png](http://cdn.xyz327.cn/FkR25jMEhRbiRlOiUvwuqPnfJW8t)

#### 初始化
```bash
git flow init
```
#### feature
[官方文档](https://github.com/petervanderdoes/gitflow-avh/wiki/Reference:-git-flow-feature)
- 开始一个feature `git flow feature start feature-name`
- 发布一个feature `git flow feature publish feature-name` (push到远程仓库)
- 切换到一个feature `git flow feature checkout feature-name`
- 获取一个feature `git flow feature pull origin feature-name` (从远程仓库获取)
- 完成一个feature `git flow feature finish feature-name`
- 删除一个feature `git flow feature delete feature-name`

#### release
[官方文档](https://github.com/petervanderdoes/gitflow-avh/wiki/Reference:-git-flow-release)
- 开始一个release `git flow release start release-name`
- 发布一个release `git flow release publish release-name`
- 完成一个release `git flow release finsh release-name`
- 删除一个release `git flow release delete release-name`

#### hotfix
 [官方文档](https://github.com/petervanderdoes/gitflow-avh/wiki/Reference:-git-flow-hotfix)
- 开始一个bugfix `git flow hotfix start hotfix-name`
- 完成一个bugfix `git flow gotfix finish hotfix-name`

#### bugfix
 [官方文档](https://github.com/petervanderdoes/gitflow-avh/wiki/Reference:-git-flow-bugfix)
> bugfix就是一种特殊的feature
- 开始一个bugfix `git flow bugfix start bugfix-name`
- 完成一个bugfix `git flow bugfix finish bugfix-name`

### IDEA gitflow可视化插件
如果觉得命令太繁琐就可以使用IDEA的gitflow可视化插件
> gitflow可视化插件是依赖gitflow命令行的

[插件地址](https://plugins.jetbrains.com/plugin/7315-git-flow-integration)

在 settings -> plugins 中搜索 `git-flow-integration` 进行安装

安装完成后在IDEA右下角就会出现这个插件了
![ideagitflow1.png](http://cdn.xyz327.cn/Fiv__uKhBee2R4nOtQUnrctZZku4)