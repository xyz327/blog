---
title: Redis-cli监控相关命令
#permalink: Redis-cli监控相关命令
tags:
  - redis
categories:
  - redis
originContent: ''
toc: false
date: 2021-06-21 19:10:58
keywords:
---

Redis-cli 是redis提供给我们的运维工具。其中包含一些运维的命令

一下命令都可以使用`-i 0.1` 来指定

## stat

打印服务的相关统计, key数量，内存使用, 客户端数量等等

```bash
redis-cli  --stat
------- data ------ --------------------- load -------------------- - child -
keys       mem      clients blocked requests            connections          
126248     254.28M  372     0       10527283 (+0)       914755      
126248     254.15M  372     0       10527286 (+3)       914755      
126248     254.07M  372     0       10527458 (+172)     914755
```

## latency

延迟测量，有多种方式

1. `--latency` 选项，cli将运行一个循环，将PING命令发送到Redis实例，并测量响应时间，每秒发送100次，统计时间以毫秒为单位。
2. `--latency-history` 选项，每15秒新的采样会重新开始。
3. `--latency-dist` 选项，使用彩色终端显示一系列延时特征。
4. `--intrinsic-latency` 选项，将会检查cli客户端所在机器的延迟，即操作系统内核的延迟，后面为固有检查时间，一般100即可。

## key

### 查看大key

**按元素数量来查询**

```bash
redis-cli --bigkeys
```

### 查看最大内存使用key

**按内存占用大小查询**

```bash
redis-cli --memkeys
```

### 查询热点key

```bash
redis-cli --hotkeys
```



