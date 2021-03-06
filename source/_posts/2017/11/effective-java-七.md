---
title: effective-java-七
date: 2017-11-10 21:55:26
tags: [effective java]
categories: java
keywords: effective java
---

方法

## 第38条： 检查参数的有效性

## 第39条： 必要时进行保护性拷贝

## 第40条： 谨慎设计方法签名
    1. 谨慎地选择方法的名称。方法的名称应该始终遵循标准的命名习惯
    2. 不要过于追求提供便利的方法。每个方法应该尽其所能。只有当一项操作被经常用到的时候，才考虑为它提供快捷方式。如果不能确定，还是不提供快捷为好
    3. 避免过长的参数列表。 目标是4个或更少
        缩短过长参数的方法
        1. 把方法分解成多个方法，每个方法只需要这些参数的一个子集。
        2. 创建辅助类，用来保存参数的分组。这些辅助类一般为静态成员类。
        3. 从对象构建到方法调用都采用Builder模式，设置完参数再调用执行(execute)方法
    4. 对于参数类型，要优先使用接口而不是类

## 第41条：慎用重载
    对于重载方法(overloaded method)的选择是静态的，而对于被覆盖的方法(overridden method)的选择则是动态的

## 第42条： 慎用可变参数

## 第43条：返回零长度的数组或者集合，而不是null

## 第44条： 为所有导出的API元素编写文档注释