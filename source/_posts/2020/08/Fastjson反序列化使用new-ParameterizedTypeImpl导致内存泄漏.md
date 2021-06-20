---
title: Fastjson反序列化使用new ParameterizedTypeImpl导致内存泄漏

tags:
  - java
  - fastjson
categories:
  - java
  - fastjson
originContent: ''
toc: true
date: 2020-08-23 16:42:45
keywords:
---

## 问题起因

在公司接口使用了统一的数据返回格式

```
{
  "code":0,
  "msg": "",
  "data": ...
}
```

但是在实现接口 sdk 时只需要 data 类型就够了。
```java
public interface TestApi{
    
    @GetMapping("status")
    public Boolean getStatus();
}
```

所以在反序列化时使用了 fastjson 通过 ParameterizedTypeImpl 来实现.

### 以下是测试 OOM 的代码

```java
    @Test
    @SneakyThrows
    public void fastjsonParseParameterizedTypeMemTest() {
        String jsonString = JSONObject.toJSONString(ApiResult.success(true));
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        for (;;){
            ParameterizedTypeImpl type = new ParameterizedTypeImpl(new Type[]{Boolean.class}, null, ApiResult.class);
            JSON.parseObject(jsonString,
                type,
                fastJsonConfig.getParserConfig(),
                fastJsonConfig.getParseProcess(),
                JSON.DEFAULT_PARSER_FEATURE,
                fastJsonConfig.getFeatures());

              int size = ParserConfig.global.getDeserializers().size();
            log.info("deserializers size: {}", size);
        }
    }
```

在 fastjson 的实现中或通过类型去获取对应的`ObjectDeserializer`对象来实现反序列化，并且会使用 `type: ObjectDeserializer` 这样的键值对缓存起来. 但是 fastjson 的这个缓存实现的 key 判断使用了 `System.identityHashCode`. 这个方法判断对象是否相等就想到与使用`==` 来判断. 由于我们每次反序列化时都是 new 一个新对象，从而导致每次判断都不相等. 在上面的测试中就会发现 deserializers 的大小越来越大。最终导致 OOM。

## 解决方案

在查看 fastjson 的releasenote 后发现 fastjson 在 1.2.73 版本修复了这个问题。

> 但是 ParameterizedTypeImpl 必须要使用`com.alibaba.fastjson.util.ParameterizedTypeImpl` 或者其子类

所以对于这个问题我们只需要

1. 升级 fastjson 版本 >= 1.2.73
2. 使用`com.alibaba.fastjson.util.ParameterizedTypeImpl`

