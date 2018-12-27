---
title: effective-java-六
date: 2017-11-10 21:06:44
tags: [effective java]
categories: java
keywords: effective java
---
枚举和注解

## 第30条： 用enum代替int常量

## 第31条：用实例域代替序数
    不要依赖枚举的`ordinal`而是自己定义实例域

## 第32条：用EnumSet代替位域

## 第33条：用EnumMap代替序数索引

## 第34条：用接口模拟可伸缩的枚举
    虽然无法编写可扩展的枚举类型，却可以通过编写接口以及实现该接口的基础枚举类型，对它进行模拟

## 第35条：注解优先于命名模式

## 第36条：坚持使用Override注解

## 第37条：用标记接口定义类型
    标记接口(marker interface) 是没有包含方法声明的接口，而是指明一个类实现了具有某种属性接口