---
title: Git Commit规范

tags:
  - git
categories:
  - git
keywords: 'git,git commit'
toc: true
date: 2020-02-28 12:21:49
---

## Git Commit 规范说明
> 规范化的commit信息可以方便每次release发版时自动生成对应的changelog


#### 自动生成CHANGELOG信息

可以使用[standard-version](https://github.com/conventional-changelog/standard-version)  
基于nodejs的规范化工具

在每次发版之前在项目跟目录下执行，就会自动生成changelog信息
```bash
npx standard-version
```

#### commit信息规范 
[commit 格式说明](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
[commit约定格式标准](https://www.conventionalcommits.org/)

commit 的格式包含 Header、Body、Footer 三个部分(其中，Header 是必须，Body 和 Footer 可以省略。)，
形如：
```code
<type>(<scope>): <subject>
<BLANK LINE> //空行
<body>
<BLANK LINE> //空行
<footer>
```
最简单的格式如下
```
<type>: <subject>
```

### Header 
> Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

1. type用于说明 commit 的类别，只允许使用下面几个标识。
2. scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
3. subject是 commit 目的的简短描述，不超过50个字符。

#### 合法的 type 标识：

|类型(type)|描述|
|---|---|
|feat|新功能|
|fix|修补bug|
|chore| 不修改src或者test的其余修改，例如构建过程或辅助工具的变动|
|docs|文档|
|style| 不影响代码含义的改动，例如格式化,去掉空格、改变缩进、增删分号|
|refactor| 重构|
|perf|提高性能的改动|
|test| 添加测试或者修改现有测试|
|revert| 执行git revert打印的message|

示例：

```
feat: 🎸 添加注册功能；
```

### Body（可省略）

> Body 部分是对本次 commit 的详细描述，可以分成多行。

> 应该说明代码变动的动机，以及与以前行为的对比。

### Footer（可省略）

> Footer 部分只用于两种情况。BREAKING CHANGE(不兼容的改变) 和 Closes (关闭的Issue)

一个完整的gitcommit规范示例：

```
feat: 测试commit规范

这是commit的详细信息

BREAKING CHANGE: 不兼容的改变

Closes #1
```


## 安装git commit工具：

> 使用 [cz-cli](https://github.com/commitizen/cz-cli) 规范commit格式，使用 [commitlint](https://conventional-changelog.github.io/commitlint) 检查commit是否符合规则

### 全局配置
1. 全局安装 commitizen
  ```shell
  npm install -g commitizen
  ```
2. 全局安装 cz-conventional-changelog
  ```bash
  npm install -g cz-conventional-changelog
  ```
3. 在用户目录下配置 commitizen
  ```bash
  # windows cmd下无法执行,可以手动去 C:\Users\{User}\ (User为你电脑用户名)目录下新建 .czrc 文件
  echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
  ```
### 项目配置

> 在全局配置的第3步中的`.czrc`文件放到项目下就可以了


### 使用 git cz 命令进行提交代码

以后提交代码都使用 `git cz` 替代 `git commit`，使 commit 内容符合规定的格式。

若还是用 `git commit` ，则需要使得 commit 内容符合规定的格式。

```bash
git cz
```

## IDEA安装[Git Commit Template](https://plugins.jetbrains.com/plugin/9861-git-commit-template)插件 
在IDEA的 settings->plugins 中安装 Git Commit Template 插件
在提交代码时使用插件格式化commit信息

![idea-commit-1](idea-commit-1.png)
![idea-commit-2](idea-commit-2.png)


## 检查git commit信息是否符合规范
//TODO