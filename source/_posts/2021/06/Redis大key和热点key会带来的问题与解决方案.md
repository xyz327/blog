---
title: Redis大key和热点key会带来的问题与解决方案
#permalink: Redis大key和热点key会带来的问题与解决方案
tags:
  - 面试
  - redis
categories:
  - redis
  - 面试
keywords: 'null'
toc: false
date: 2021-06-21 18:01:00
---

<!--more-->

## redis大key

### 带来的问题

大key 那肯定就会redis保存的数据量会大，

1. 增加服务和redis之间的数据传输压力
2. 由于redis是单线程的所以会造成redis处理的时间过长而阻塞后续的请求。拖慢redis的请求处理速度
3. 删除大key时也会造成阻塞

### 定位大key

使用redis-cli (内部使用scan实现)

```
# -i 0.1 ,每隔100条就会休眠0,.1秒
redis-cli --bigkeys  -i 0.1
```

### 解决方案

优化redis key的保存方案.尽量减少redis key的数据量.把一个key分割成多个分别保存到集群各个节点中

### 大key的删除方案

1. 使用scan 类的命令分多次删除，每次值删除部分数据
2. redis>=4.0 使用 unlink 异步删除

## redis热点key

### 带来的问题

由于某一个key是保存在某个节点上。如果热点key就是访问量激增。造成大量的流量都打到某个特定的节点上。严重可能导致节点挂掉

### 定位热点key

1. 业务预估，例如秒杀场景
2. 在客户端做统计收集
3. 如果redis集群是有前置proxy的话就可以在proxy层统计收集
4. 使用`redis-cli --hotkeys -i 0.1`命令来统计

### 解决方案

1. 本地缓存,做一个二级缓存，先查服务本地内存，然后没有再去redis查
   1.1. 需要知道有哪些热点key
   1.2. 本地服务内存容量有限
   1.3. 可能会导致数据不一致的时间增加
2. 多副本方案，再集群多个节点中都保存key，然后再key+random(N).N 为副本节点数量

