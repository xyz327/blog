# redis 命令

## Strings

### get

### set

### getset

### append

### mget

### mset

### msetnx

### psetex

### incr

### decr

### incrby

### decrby
### incrbyfloat
### setrange
### getrange
### strlen
### setbit

### getbit

### bitcount

### bitop

### bitpos

### bitfield



## Lists

### lpush
### rpush

### lpop

### rpop

### llen

### lindex

### linsert

### lpos

### lrange

### ltrim

### lrem

### lset

### lpushx

### rpushx

### rpoplpush

### blpop

### brpop

### brpoplpush



## Sets

### sadd

### spop

### scard

### sdiff

### sdiffstore

### sinter

### sinterstore

### sismember

### smembers

### smove

### srandmember

### srem

### sunion

### sunionstore

### sscan

## Sorted Sets

### zadd

### zcard

### bzpopmin

### bzpopmax

### zcount

### zdiff

### zdiffstore

### zincrby

### zinter

### zinterstore

### zlexcount

### zpopmax

### zpopmin

### zrandmember

### zrangestore

### zrange

### zrangebylex

### zrevrangebylex

### zrangebyscore

### zrank

### zrem

### zremrangebylex

### zremrangebyrank

### zremrangebyscore

### zrevrange

### zrevrangebyscore

### zrevrank

### zscore

### zunion

### zmscore

### zunionstore

### zscan

## Hashs

### hdel

### hexists

### hget

### hgetall

### hincrby

### hincrbyfloat

### hkeys

### hlen

### hmget

### hmset

### hset

### hsetnx

### hrandfield

### hsetlen

### hvals

### hscan

## Keys

### copy

### del

### dump

### exists

### expire

### expireat

### expiretime

### keys

### migrate

### move

### object

### persist

### pexpire

### pexpireat

### pexpiretime

### pttl

### randomkey

### rename

### renamenx

### restore

### sort

### touch

### ttl

### type

### unlink

### wait

### scan

## Pub/Sub

### psubscribe

### pubsub

### publish

### punsubscribe

### subscribe

### unsubscribe

## HyperLogLog

### pfadd

### pfcount

### pfmerge

### Geo

### geoadd

### geohash

### geopos

### geodist

### georadius

### georadiusbymember

### geosearch

### geosearchstore

## Tansactions

### discard

### exec

### multi

### unwatch

### watch

## Scripts

### eval

### eval_ro

### evalsha

### evalsha_ro

### script debug

### script exists

### script flush

### script kill

### script load

## Streams (Redis 5.0)

### xinfo

### xadd

### xtrim

### xdel

### xrange

### xrevrange

### xlen

### xread

### xgroup

### xreadgroup

### xack

### xclaim

### xautoclaim

### xpending

## Connections

### auth

### client caching

### client id

### client info

### client kill

### client list

### client getname

### client getredir

### client unpause

### client pause

### client reply

### client setname

### client tracking

### client trackinginfo

### client unblock

### echo 

### hello

### ping

### quit

### rest

### select

## Server

### acl load

### acl save

### acl list

### acl users

### acl getuser

### acl setuser

### acl deluser

### acl cat

### acl genpass

### acl whoami

### acl log

### acl help

### bgrewriteaof

### bgsave

### command

### command count

### command getkeys

### command info

### config get

### config rewrite

### config set 

### config resetstat

### dbsize

### debug object

### debug segfault

### failover

### flushall

### flushdb

### info

### lolwut

### lastsave

### memory doctor

### memory help

### memory malloc-stats

### memory purge

### memory stats

### memory usage

### module list

### module load

### module unload 

### monitor

### role 

### save

### shutdown

### slaveof

### replicaof

### slowlog

### swapdb

### sync

### psync

### time

### latency doctor

### latency graph

### latency history

### latency latest

### latency reset

### latency help



 ## Cluster

### cluster addslots

### cluster bumpepoch

### cluster count-failure-reports

### cluster countkeysinslot

### cluster delslots

### cluster failover

### cluster flushslots

### cluster forget

### cluster getkeysinslot

### cluster info

### cluster keyslot

### cluster meet

### cluster myid

### cluster nodes

### cluster replicate

### cluster reset

### cluster saveconfig

### cluster set-config-epoch

### cluster setslot

### cluster slaves

### cluster replicas

### cluster slots

### readonly

### readwrite

