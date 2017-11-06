---
title: maven-release版本管理插件
date: 2017-11-02 18:22:49
tags: maven
categories: maven
keywords: maven
---
使用maven管理项目时，完成开发后需要把项目发布到maven私服上去。

手动执行`mvn clean deploy`就可以部署到私服上。

在开发是还会需要SNAPSHOT版本和RELEASE版本可以用`mvn versions:set -DnewVersion=0.1.1-SNAPSHOT`进行更改版本号

当然maven还有更好的管理插件进行管理`maven-release-plugin`

<!--more-->

在pom.xml添加插件
```xml
<build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-release-plugin</artifactId>
        <version>2.5.3</version>
      </plugin>
    </plugins>
  </build>
```
在pom.xml添加scm信息(SCM：Software Configuration Management)
```xml
  <scm>
    <!--maven仓库地址-->
    <url>http://192.168.8.194/content/repositories/releases/</url>
    <!--代码版本仓库地址-->
    <connection>scm:git:http://192.168.8.65/xx/cli.git</connection>
    <developerConnection>scm:git:http://192.168.8.65/xx/cli.git</developerConnection>
    <tag>HEAD</tag>
  </scm>
```
配置好后可以使用mvn的scm命令管理

添加scm插件
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-scm-plugin</artifactId>
    <version>1.9.5</version>
</plugin>

```
```bash
 #提交
mvn -Dmessage="<commit_log_here>" scm:checkin

# 获取最新版本：
mvn scm:update
```

SCM支持两种连接类型：connection 及 developerConnection

```xml
 <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-scm-plugin</artifactId>
        <version>1.8.1</version>
        <configuration>
            <!--<connectionType>developerConnection</connectionType>-->
            <connectionType>connection</connectionType>
        </configuration>
      </plugin>
    </plugins>
  </build>
```
项目是SNAPSHOT版本开发好之后就可以发布RELEASE版了，直接使用

```bash
#把版本号改为RELEASE，向代码仓库推送新的版本
mvn release:prepare

#向maven私服中推送RELEASE版本
mvn release:perform

#prepare之后可以回退
mvn release:rollback
```



