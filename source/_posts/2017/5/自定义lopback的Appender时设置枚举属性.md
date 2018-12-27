---
title: 自定义lopback的Appender时设置枚举属性
date: 2017-05-22 21:46:34
tags: 
categories: logback
keywords: [logback]
---

在自定义`Appender`时，设置属性可以直接通过`logback.xml`进行设置,但是枚举对象，默认的处理方法不能处理,
这事可以自己定义一个新的解析规则


```java
public class DIYAppender extends OutputStreamAppender {
    /**
    * 使用 {@link ch.qos.logback.core.joran.action.NestedBasicPropertyIA} 解析
    */
    private String attr;
    /**
    * 使用 {@link ch.qos.logback.core.joran.action.NestedComplexPropertyIA} 解析
    */
    private User objAttr;
    /**
    * 使用 {@link enumObjAction} 解析
    */
    private enumObj enumAttr;
    //省略 getter/setter方法
}
public class User {

}
public enum enumObj {
    Instance;
    private String name;
    //省略 getter/setter
}
public class enumObjAction extends ch.qos.logback.core.joran.action.Action {
    @Override
    public void begin(InterpretationContext ic, String name, Attributes attributes) throws ActionException {
        ic.pushObject(enumObj.Instance);
    }

    @Override
    public void end(InterpretationContext ic, String name) throws ActionException {

    }
}
```
可以在`logback.xml`的appender节点中直接进行设置,如果属性是对象可以提供`class`属性进行设置
```xml
    <newRule pattern="configuration/appender/enumAttr" class="enumObjAction"/>
    <appender class="DIYAppender">
        <attr>value</attr><!--设置attr的值为value  --> 
        <objAttr class="package.User">
            <!--还可以给User进行设置属性值-->
        </objAttr>
        <enumAttr>
            <name>nameValue</name>
        </enumAttr>
    </appender>
```


