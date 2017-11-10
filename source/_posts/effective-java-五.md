---
title: effective-java-五
date: 2017-11-10 20:03:59
tags: [effective java]
categories: java
keywords: effective java
---

泛型

## 第23条：不要在新代码中使用原生态类型

## 第24条：消除非受检警告

```java
@SuppressWarnings("unchecked")
```
    `@SuppressWarnings`注解可以用在任何粒度的级别中，应该尽可能使用在小的范围中 
    每当使用`@SuppressWarnings`注解时，都要添加一条注释，说明为什么这么做是安全的

## 第25条：列表优先于数组

    数组于泛型相比，有两个重要的不同点
    1. 数组是协变的(covariant) 
        如果`Sub`是`Super`的子类型，那么数组类型`Sub[]`就是`Super[]`的子类型
       泛型是不可变的(invariant)
    2. 数组是具体化的(reified) 数组会在运行时才知道并检测她们的元素类型
       泛型则是通过擦除(erasure)来实现的。因此泛型只是在编译时强化他们的类型信息，
       并在运行时丢弃(或者擦除)它们的元素类型信息

## 第26条：优先考虑泛型

## 第27条：优先考虑泛型方法

## 第28条： 利用有限制通配符来提升API的灵活性
    Collection<? extends E> : E 的子类型的集合
    Collection<? super E> : E的超类的集合

## 第29条：优先考虑类型安全的异构容器

