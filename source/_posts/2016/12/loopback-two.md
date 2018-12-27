---
title: loopback two
date: 2016-12-06 11:44:37
tags: loopback
categories: loopback
keywords: loopback
---

loopback PersistedModel 的方法与rest api对应表

model的方法名|HTTP Method|restApi url|说明
-----------|-----------|-----------|---
`create`|POST|/Model
`upsert`|PATCH|/Model
`upsert`|PUT|/Model
`exists`  |GET|/Model/:id/exists
`findById`|GET|/Model/:id|查找对应id的Model
`prototype.updateAttributes`|PATCH|/Model/:id
`prototype.updateAttributes`|PUT|/Model/:id
`destroyById`/`deleteById`|DELETE|/Model/:id
`exists`|HEAD|/Model/:id
`find`    |GET|/Model
`findOne` |GET|/Model/findOne
`count`    |GET|/Model/count
`createChangeStream`| GET|/Model/chage-stream
`createChangeStream`| POST|/Model/chage-stream
`replaceById`|POST|/Model/:id/replace
`replaceOrCreate`|POST|/Model/replaceOrCreate
`updateAll`|POST|/Model/update
`upsertWithWhere`|POST|/Model/upsertWithWhere

关系模型的部分方法与rest api 对应表 更多说明参考 [官方文档](http://loopback.io/doc/en/lb2/Accessing-related-models.html)

model的关联对象的方法名|HTTP Method|restApi url|说明
-------------------|-----------|-----------|--------
`__get__attr`|GET|/Model/:id/attr|查找对应id的Model下的attr数据
`__create__attr`|POST|/Model/:id/attr|创建一条对应id的Model下的attr数据
`__delete__attr`|DELETE|/Model/:id/attr|删除对应id的Model下的所有attr数据
`__count__attr`|GET|/Model/:id/attr/count|查找对应id的Model下的attr数据数量
`__findById__attr`|GET|/Model/:id/attr/:attrId|查找对应id的Model下的id为attrId的数据
`__destroyById__attr`|DELETE|/Model/:id/attr/:attrId|删除对应id的Model下的id为attrId的数据
`__updateById__attr`|PUT|/Model/:id/attr/:attrId|更新对应id的Model下的id为attrId的数据
`__exists__attr`|HEAD|/Model/:id/attr/rel/:attrId|检查对应id的Model下的id为attrId的数据(貌似没什么用)
`__link__attr`|PUT|/Model/:id/attr/rel/:attrId|新增Model与attr的中间数据 (多对多关系)
`__unlink__attr`|DELETE|/Model/:id/attr/rel/:attrId|删除Model与attr的中间数据 (多对多关系)
