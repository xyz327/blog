---
title: mysql 记录
date: 2016-12-06 16:36:39
tags: mysql
categories: mysql
keywords: mysql xyz327
---
## 全角字符
存入全角的字母，然后用模糊查询 查询不出来..暂时先把全角改为半角...

## 事物隔离级别
今天把程序发布到线上环境时，插入数据时mysql直接报错
>Cannot execute statement: binlogging impossible since BINLOG_FORMAT = STATEMENT and at least one table uses a storage engine limited to row-logging. InnoDB is limited to row-logging when transaction isolation level is READ COMMITTED or READ UNCOMMITTED.

百度一番，说问题是因为我程序插入数据时开启了事物
 mysql默认的binlog_format是STATEMENT，而在READ COMMITTED或READ UNCOMMITTED隔离级别下，innodb只能使用的binlog_format是ROW。
 我程序事物使用的隔离级别默认为READ_COMMINTED 

 解决办法有两个
  1. 修改程序的事物隔离级别,不使用READ COMMITTED或READ UNCOMMITTED 这两种隔离级别。mysql默认的事物隔离级别是REPEATABLE_READ
  2. 修改mysql的配置 my.ini 设置 binlog_format=ROW