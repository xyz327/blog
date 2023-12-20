---
title: Redis-Strings命令说明
#permalink: Redis-Strings命令说明
tags:
  - redis
categories:
  - redis
keywords: 'null'
toc: false
date: 2021-06-21 23:00:53
---

# Redis Strings操作命令

## set(设置字符串)

> 时间复杂度: O(1)

设置一个key:value 如果key已存在，那就会直接覆盖掉value(不管类型)

```
set key vale [EX seconds | PX milliseconds | EXAT timestamp |PXAT milliseconds-timestamp | KEEPTTL | NX | XX] [GET]
```

**参数说明**

1. EX 设置key多久之后过期 单位秒
2. PX 设置key多久之后过期 单位毫秒
3. NX 只有当key不存在时才设值(NOT EXISTS)
4. XX 只有当key存在时才设值
5. KEEPTTL （6.0新增）保留前一个key设置的TTL(过期时间),例如，`set k a EX 10`, `5`秒后执行`set k b KEEPTTL` 那么现在`k`的值就是`b`，TTL还剩`5S`
6. EXAT (6.2新增)设置key的过期时间戳 精确到秒
7. PXAT (6.2新增)设置key的过期时间戳 精确到毫秒
8. GET (6.2新增)返回旧值，不存在旧值就返回`nil`

### 返回值

1. ok:  正常执行
2. nil: 值没有被设置(指定了`NX` `XX` 条件时)
3. 

## mset（设多个key)

> 时间复杂度: O(N) N = key的数量

```
mset key value [key1 value1 key2 value2 ...]
```

### 返回值

1. ok： 总是返回`ok` **mset 不会失败**

## get(获取字符串的值)

> 时间复杂度: O(1)

**get只能处理string类型**

获取一个key的值，key不存在就返回`nil`，如果key对应的value的类型不是string 那就会报错。

### 返回值

1. 

## mget （获取多个值）

> 时间复杂度:O(N) N=key的数量

```
mget key [key1 key2 ...]
```

返回一个集合，和指定的key顺序一致，如果其中默认key不存在，那么对应的value就为`nil`



## del(删除元素)

> 时间复杂度: O(N)
> N 取决于待删除key的类型
> 
> 1. string: O(1)
> 2. 集合类型: N=集合中的元素数量

删除一个key，如果key不存在那就忽略

## incr(累加一个数字)

> 时间复杂度: O(1)

```
incr key
```

给key 对应的值 累加1 如果key不存在 那么就是把key的值设置为0. 如果value不是数字就会抛出异常
**最大为64位符号整数(2^63 - 1)**
应用场景:

1. 计数器(counter)
2. 限流器(rate limiter)

## decr(累减一个数字)

> 同 incr

```
decr key
```

## incrby（增加数字）

> 时间复杂度: O(1)

```
incrby key increment
```

给key 增加指定的数字, `incr key` 相当于 `incrby key 1`

## decrby （减少数字）

> 和`incrby` 类似

```
decrby key  decrement
```

