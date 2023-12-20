---
title: Redis协议(RESP)说明
#permalink: Redis协议(RESP)说明
tags:
  - redis
categories:
  - redis
keywords: 'null'
toc: false
date: 2021-06-26 13:26:49
---

# RESP

> REdis Serialization Protocol 用于redis的client和server 交互的协议

## RESP 遵循的原则

1. 实现简单(simple to implement)
2. 快速解析（fast to parse）
3. 人类可读 （human readable）

## 请求响应模型(Request-Response Model)

> RESP 就是一个简单的请求响应，处理两个特殊情况

1. pipeline, 客户端可以一次性发送多个请求然后等待响应
2. pub/sub, 对于pub/sub 客户端不再需要发送命令，而是由服务器推送

## RESP 协议描述

> RESP在redis1.2 引入，在Redis2.0成为标准协议
> RESP 实际上就是一个序列化协议，可以支持 `simple strings` `errors` `integers` `bulk strings` `arrays`

在redis中使用RESP作为Request-Response协议时使用方式如下

1. 客户端将命令以`RESP`的`bulk string`数组的形式发送给redis服务端
2. redis服务端根据命令来返回对应的`RESP`数据类型

在`RESP`中总是会以`\r\n(CRLF)`结尾

在`RESP`中，数据类型取决于第一个字符

|第一个字符|对应的类型|示例|
|:----:|--|--|
|`+`|simple strings|`+OK\r\n`|
|`-`|errors|`-ERR unknown command 'foobar'\r\n` `-`表示为这是个异常,`-`到` `(第一个空格)为错误类型,之后的为错误具体说明|
|`:`|integers|`:100\r\n`数字范围在 `-2^63`<=`n`<=`2^63-1`(64为有符号数)|
|`$`|bulk strings|`$2\r\nOK\r\n` `bulk string`和`simple string`的区别是`bulk string`是二进制安全的(因为标记了字符的长度)`$0\r\n`=>`empty string`  **特殊**`$-1\r\n`=>`nil`|
|`*`|arrays|`*2\r\n$3\r\nfoo\r\n$3\r\nbar\r\n`=>两个`bulk string`的数组. `*-1\r\n`=>`null array`|

第一个字符对应的类型示例`+`simple strings`+OK\r\n``-`errors`-ERR unknown command 'foobar'\r\n` `-`表示为这是个异常,`-`到` `(第一个空格)为错误类型,之后的为错误具体说明`:`integers`:100\r\n`数字范围在 `-2^63`<=`n`<=`2^63-1`(64为有符号数)`$`bulk strings`$2\r\nOK\r\n` `bulk string`和`simple string`的区别是`bulk string`是二进制安全的(因为标记了字符的长度)`$0\r\n`=>`empty string`  **特殊**`$-1\r\n`=>`nil``*`arrays`*2\r\n$3\r\nfoo\r\n$3\r\nbar\r\n`=>两个`bulk string`的数组. `*-1\r\n`=>`null array`#


```
C: *2\r\n
C: $4\r\n
C: LLEN\r\n
C: $6\r\n
C: mylist\r\n

S: :48293\r\n
```

