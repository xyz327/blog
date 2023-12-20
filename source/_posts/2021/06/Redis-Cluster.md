---
title: Redis-Cluster
#permalink: Redis-Cluster
tags:
  - redis
categories:
  - redis
keywords: 'null'
toc: false
date: 2021-06-21 21:41:24
---

## Cluster

> redis cluster 基于哈希槽(hashslot) 来实现cluter

### hashslot

redis固定总共有`16384`个哈希槽.然后将这个些槽平均分配并映射到集群中的redis节点中去.（）

### 设计目标(按重要性排列)

1. 高性能和可线性扩展到1000个节点的伸缩性（不使用代理,异步复制,并且没有值合并操作）

## 客户端写入流程

1. 客户端使用 `slot=CRC(key) % 16384` 的方式计算出key 所对应的`hashslot`
2. 从redis节点中使用`cluster slots` 获取整个集群的哈希槽分配信息(缓存)
3. 往对应的redis节点中写入



