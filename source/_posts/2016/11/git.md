---
title: git操作记录
date: 2016-11-30 09:20:44
tags: git
categories: git
---

## 开始
设置git
```shell
$ git config --global user.name "xyz327"   //给自己起个用户名
$ git config --globla user.email  "xyz327@outlook.com"   //填写自己的邮箱
```
## 解决冲突
1. 放弃本地修改，直接更新远端内容  
```shell
git fetch --all
git reset --hard origin/master
# git fetch 只是下载远程的库的内容，
# 不做任何的合并 git reset 把HEAD指向刚刚下载的最新的版本
```
2.
