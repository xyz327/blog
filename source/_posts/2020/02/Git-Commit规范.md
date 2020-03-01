---
title: Git Commit规范
permalink: Git Commit规范
tags:
  - git
categories:
  - git
keywords: 'null'
toc: false
date: 2020-02-28 12:21:49
---

## Git Commit 规范说明
#### [commit 格式说明](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)：

commit 的格式包含 Header、Body、Footer 三个部分(其中，Header 是必须，Body 和 Footer 可以省略。)，
形如：
```code
<type>(<scope>): <subject>
<BLANK LINE> //空行
<body>
<BLANK LINE> //空行
<footer>
```

### Header 
> Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

1. type用于说明 commit 的类别，只允许使用下面7个标识。
2. scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
3. subject是 commit 目的的简短描述，不超过50个字符。

#### 合法的 type 标识：

|类型(type)|描述|
|---|---|
|feat|新功能|
|fix|修补bug|
|docs|文档|
|style| 格式化代码|
|refactor| 重构|
|test| 完善测试|
|chore| 其它维护相关更改|

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
```shell
npm install -g commitizen
npm install -g git-cz
npm install -g @commitlint/cli @commitlint/config-conventional
# 增加 git-hook 检查 commit 格式
npm install --save-dev husky
```

使用 `git cz` 替代 `git commit`，使 commit 内容符合规定的格式。

若还是用 `git commit` ，则需要使得 commit 内容符合规定的格式。

```shell
git cz
```

## IDEA安装[Git Commit Template](https://plugins.jetbrains.com/plugin/9861-git-commit-template)插件 
在IDEA的 settings->plugins 中安装 Git Commit Template 插件
在提交代码时使用插件格式化commit信息

![idea-commit-1](idea-commit-1.png)
![idea-commit-2](idea-commit-2.png)