---
title: springIOC的refresh方法
#permalink: springIOC的refresh方法
tags:
  - spring
categories:
  - spring
keywords: 'null'
toc: false
date: 2021-06-20 13:08:52
---

# _

## refresh方法概览

```java
public void refresh() throws BeansException, IllegalStateException {
  synchronized (this.startupShutdownMonitor) {
    StartupStep contextRefresh = this.applicationStartup.start("spring.context.refresh");
    // Prepare this context for refreshing.
    prepareRefresh();
    // Tell the subclass to refresh the internal bean factory.
    ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
    // Prepare the bean factory for use in this context.
    prepareBeanFactory(beanFactory);
    try {
      // Allows post-processing of the bean factory in context subclasses.
      postProcessBeanFactory(beanFactory);
      StartupStep beanPostProcess = this.applicationStartup.start("spring.context.beans.post-process");
      // Invoke factory processors registered as beans in the context.
      invokeBeanFactoryPostProcessors(beanFactory);
      // Register bean processors that intercept bean creation.
      registerBeanPostProcessors(beanFactory);
      beanPostProcess.end();
      // Initialize message source for this context.
      initMessageSource();
      // Initialize event multicaster for this context.
      initApplicationEventMulticaster();
      // Initialize other special beans in specific context subclasses.
      onRefresh();
      // Check for listener beans and register them.
      registerListeners();
      // Instantiate all remaining (non-lazy-init) singletons.
      finishBeanFactoryInitialization(beanFactory);
      // Last step: publish corresponding event.
      finishRefresh();
    } catch (BeansException ex) {
      // Destroy already created singletons to avoid dangling resources.
      destroyBeans();
      // Reset 'active' flag.
      cancelRefresh(ex);
      // Propagate exception to caller.
      throw ex;
    }  finally {
      // Reset common introspection caches in Spring's core, since we
      // might not ever need metadata for singleton beans anymore...
      resetCommonCaches();
      contextRefresh.end();
    }
  }
}
```

<!-- more -->

## refresh方法步骤说明

### prepareRefresh

主要是做一些初始化的工作.验证必要属性. 初始化`earlyApplicationListeners`

### obtainFreshBeanFactory

创建并获取 BeanFactory (是否可以重复调用refresh区分两种子类实现)

### AbstractRefreshableApplicationContext

> 主要是xml的实现

1. FileSystemXmlApplicationContext
2. ClassPathXmlApplicationContext

#### GenericApplicationContext

> 通用的实现

1. GenericXmlApplicationContext
2. StaticApplicationContext
3. GenericGroovyApplicationContext
4. AnnotationConfigApplicationContext

### prepareBeanFactory

对`BeanFactory`做一些默认的初始化工作（,）

1. 设置classloader
2. 基于`ApplicationContext`的一系列Aware接口的`BeanPostProcessor`
3. 注册`ApplicationListener`接口的`BeanPostProcessor`
4. 注册默认的Bean (Environment等)

### postProcessBeanFactory

> 默认为空，由子类去实现

在SpringMVC 中

1. 注册`ServeletContextAware`
2. 注册`Request`，`Session`,`Application` 的`Scope`
3. 注册`RequestObjectFactory`/`ResponseObjectFactory`/`SessionObjectFactory`/`WebRequestObjectFactory` 等工厂Bean，用来处理在`Controller` 中使用成员变量的方式注入`Request`/`Response`/`Session`/`WebRequest`等对象。具体使用可见下面
   ```java
   @RequestMapping
   @Controller
   public class TestController{
     // 这里注入的对象是其实是一个代理了RequestObjectFactory的代理对象
     // 在每次调用时都会使用RequestContextHolder从当前上下文中获取HttpServletRequest对象来进行真实的调用
     @Autowired
     private HttpServletRequest httpRequest;
     @GetMapping("test")
     public String handle(){
       HttpSession session = httpRequest.getSession();
     }
   }
   ```

### invokeBeanFactoryPostProcessors

顾名思义 就是调用`BeanFactoryPostProcessor`的`postProcessBeanFactory`方法

> 会优先执行实现了`PriorityOrdered`接口的，然后在执行实现了`Ordered`接口的，最后再执行其他的`BeanFactoryPostProcessor`

### registerBeanPostProcessors

同样看名字就能知道是注册`BeanPostProcessor`

> 同样也遵循 `实现了PriorityOrdered` -> `实现了Ordered` -> `其他BeanPostProcessor`

### initMessageSource

一样，做`MessageSource` Bean的初始化

### initApplicationEventMulticaster

初始化`ApplicationEventMulticaster` 用来支持 ApplicationListener/ApplicationEvent 事件订阅与发布

### onRefresh

空实现，在SpringMVC中用来初始化 `ThemeSource`

### registerListeners

这一步自然就是把`ApplicationListener`注册到上面的`ApplicationEventMulticaster`中

> 并不会初始化`ApplicationListener`对象,只是添加BeanName。为了能应用`BeanPostProcessor`初始化都在下一步去做

### finishBeanFactoryInitialization

1. 初始化`ConversionService`
2. 增加默认的`StringValueResolver`用来解析注解value中的`${}`占位符.例如`@PathVariable("${name}")`
3. 初始化其他所有非Lazy的Bean （Bean的初始化）

### finishRefresh

1. 初始化`LifecycleProcessor`并调用`LifecycleProcessor.onRefresh()`
2. 发布`ContextRefreshedEvent`事件

## 其他

### 关于`ApplicationEvent`

在spring中有四个`ApplicationEvent`的子类（对应发出事件的方法）

1. ContextRefreshedEvent -> refresh()
2. ContextClosedEvent -> close()
3. ContextStartedEvent -> start()
4. ContextStoppedEvent -> stop()

我们在启动/销毁spring容器是调用`ApplicationContext`的 `refresh`/`close`方法(对于spring容器启动/关闭,这两个方法就够了)

但是为什么还要设计start/stop 两个事件呢? 而且spring默认启动时也不会调用对应的方法去触发这两个事件(除非手动调用ApplicationContext.start())

对于`start`/`stop`两个事件。主要还是用于将其他组件的生命周期和Spring的生命周期做绑定（使用`SmartLifecycle`接口,`Lifecycle`接口只有在调用`ApplicationContext.start/stop`方法之后才会执行）

```
public interface SmartLifecycle extends Lifecycle, Phased {
        // 是否在spring启动时自动启动
	default boolean isAutoStartup() {
		return true;
	}

	default void stop(Runnable callback) {
		stop();
		callback.run();
	} 
        // 启动的阶段，类似order 数字越小越先执行
	default int getPhase() {
		return DEFAULT_PHASE;
	}

}
```





