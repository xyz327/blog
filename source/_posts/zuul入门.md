---
title: zuul入门
date: 2017-11-03 10:24:22
tags: [spring cloud, zuul]
categories: spring cloud
keywords: zuul, spring cloud
---

zuul是spring cloud的网关组件，用户在微服务中提供一个统一的对外接口，官方对zuul的说明是 

`Zuul is an edge service that provides dynamic routing, monitoring, resiliency, security, and more. `
<!-more-->
## ZuulFilter
zuul是的核心就是`com.netflix.zuul.ZuulFilter`,对于zuul网关的相关功能都是通过扩展这个ZuulFilter来实现的

ZuulFilter只需要实现几个方法就行
```java
public abstract class ZuulFilter implements IZuulFilter, Comparable<ZuulFilter> {
    /**
     * 指明过滤器的类型 zuul定义类四种类型 pre, route, post, error
     * 可以在 com.netflix.zuul.FilterProcessor 中看到
     */
    abstract public String filterType();
    /**
     * filter的排序序号 在同类型中 filterOrder 越小约先执行
     */
    abstract public int filterOrder();
    /**
     * 是否应该执行Filter
     */
    abstract public boolean shouldFilter();

    /**
     * 如果 shouldFilter() 为 true, 才会调用这个方法.
     * 这个方法是一个ZuulFilter的核心方法
     * @return 随意返回，反正zuul会忽略这个返回值
     */
    abstract public Object run();
}

```
### 编写ZuulFilter

例如实现一个判断请求是否带有accessToken的Filter 

```java
public class AuthenticationFilter extends ZuulPreFilter {
    public String filterType(){
        return "pre";
    }
    public int filterOrder(){
        return 0;
    }
    public boolean shouldFilter(){
        return true;
    }
    public Object run(){
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();
        String accessToken = request.getParameter("access_token");
        if(accessToken == null || "".equals(accessToken)){
            ctx.setSendZuulResponse(false);
            ctx.setResponseStatusCode(403);
            return null;
        }
        return null;
    }

}
```

### 注册ZuulFilter
实现的`ZuulFilter`都通过`com.netflix.zuul.filters.FilterRegistry#put(String, ZuulFilter)`进行注册

`FilterRegistry`是个单例

直接通过`com.netflix.zuul.filters.FilterRegistry#instance`就可以获取实例

Zuul里面单例用的比较多

## 配置Zuul

要使用Zuul 需要配置一个`com.netflix.zuul.context.ContextLifecycleFilter`和一个 

`com.netflix.zuul.filters.ZuulServletFilter` 

或者 `com.netflix.zuul.http.ZuulServlet`

`ZuulServlertFilter`和`ZuulServlet`二选一就行 这两个就是请求的入口

`ContextLifecycleFilter`主要是对`com.netflix.zuul.context.RequestContext`的生命周期做管理

`com.netflix.zuul.context.RequestContext`是一个上下问对象，在`ZuulFilter`中可以使用`RequestContext#getInstacne()`获取到当前的请求上下文，
`RequestContext`内部使用`ThreadLocal`来实现

配置了`ZuulServlertFilter`或者`ZuulServlet`之后 

### ZuulServlet
以`ZuulServlet`来说，`service`方法就是核心

在`service`方法中主要就是初始化`RequestContext`以及调用各个类型的`ZuulFilter` 

```java
try {
    init((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse);

    // Marks this request as having passed through the "Zuul engine", as opposed to servlets
    // explicitly bound in web.xml, for which requests will not have the same data attached
    RequestContext context = RequestContext.getCurrentContext();
    context.setZuulEngineRan();

    try {
        preRoute();
    } catch (ZuulException e) {
        error(e);
        postRoute();
        return;
    }
    try {
        route();
    } catch (ZuulException e) {
        error(e);
        postRoute();
        return;
    }
    try {
        postRoute();
    } catch (ZuulException e) {
        error(e);
        return;
    }
} catch (Throwable e) {
    error(new ZuulException(e, 500, "UNHANDLED_EXCEPTION_" + e.getClass().getName()));
} finally {
    RequestContext.getCurrentContext().unset();
}
```
在`ZuulServlet`内部持有个`com.netflix.zuul.ZuulRunner`对象

各个`xxRoute()`方法都是委托给`ZuulRunner`的方法去调用

`ZuulRunner`在委托给`FilterProcessor`去调用， `FilterProcessor`是一个单例

`FilterProcessor`使用`FilterLoad`最后调用到`FilterRegistry`获取注册的Filter进行调用


