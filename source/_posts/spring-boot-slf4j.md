---
title: 扩展spring-boot自带的logback输出设置
date: 2016-12-29 19:42:04
tags: [spring-boot]
categories:
keywords:spring spring-boot slf4j
---

`spring-boot-starter-web`依赖了`spring-boot-starter-logging`默认是使用logback的实现。
在`spring-boot`默认的日志输出设置
在`resources`目录下添加`logback.xml`内容如下
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/base.xml" />
    <logger name="cn.xyz327" level="debug"/>
</configuration>
```
设置后就可以在代码中使用`org.slf4j.Logger`了,日志的输出格式采用`spring-boot`默认的格式
