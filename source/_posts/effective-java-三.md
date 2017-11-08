---
title: effective-java-三
date: 2017-11-06 21:03:57
tags: effective java
categories: java
keywords: effective java
---

## 第八条：覆盖equals时请遵守通用约定
1. 类的每个实例本质上都是唯一的
2. 不关心类是否提供了“逻辑相等”的测试功能
3. 超类已经覆盖了equals， 从超类继承过来的行为对于子类也是合适的
4. 类是私有的或者包级别私有的，可以确定它的equals方法永远不会被调用

equals方法实现了等价关系
1. 自反性： 对于任何非`null`的引用值`x`, `x.equals(x)` 必须返回`true`;
2. 对称性： 对于任何非`null`的引用值`x`和`y`， 当且仅当`x.equals(y)`返回`true`时， `y.equals(x)`必须返回`true`;
3. 传递性： 对于任何非`null`的引用值`x`,'y'和`z`，如果`x.equals(y)`返回`true`，并且`y.equals(z)`也返回`true`，那么`x.equals(z)`也必须返回`true`;
4. 一致性： 对于任何非`null`的引用值`x`和`y`，只要`equals`中的比较信息没有被改变，多次调用`x.equals(y)`就会一直返回`true`或者`false`;
5. 对于任何非`null`的引用值`x`，`x.equals(null)`必须返回`false`;

## 第九条： 覆盖equals时总要覆盖hashCode

## 第十条： 始终要覆盖toString

## 第十一条： 谨慎覆盖clone

## 第十二条： 考虑实现Comparable接口
    compareTo 方法返回值为负值，0，正值， 表示 小于， 等于， 大于