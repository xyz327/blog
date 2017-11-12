---
title: effective-java-九
date: 2017-11-12 11:12:50
tags: [effective java]
categories: java
keywords: effective java
---

异常

## 第57条：只针对异常的情况才使用异常

## 第58条：对可恢复的情况使用受检异常，对编程错误使用运行时的异常
    java 三种可抛出结构(throwable): 受检异常，运行时异常，错误

## 第59条：避免不必要的使用受检的异常

## 第60条：优先使用标准的异常

|异常|使用场合|
|IllegalArgumentException | 非null的参数值不正确|
|IllegalStateException | 对于方法调用而言，对象状态不合适|
|NullPointerException | 在禁止使用null的情况下参数值为null|
|IndexOutOfBoundsException | 下标参数值越界|
|ConcurrentModificationException | 在禁止并发修改的情况下，检测到对象的并发修改|
|UnsupportOperationException | 对象不支持用户请求的方法|

## 第61条：抛出与抽象相对应的异常
    高层的实现应该捕获底层的异常，同时抛出可以按照高层抽象进行解释的异常。这种做法被称为'异常转译'。
    一种特殊的异常转译形式称为异常链，如果底层的异常对与调试高层异常的问题有帮助，使用异常链就合适。底层的异常被传到高层的异常，高层异常提供访问方法(`Throwable.getCause`)来获得底层异常
