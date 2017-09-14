---
title: spring一些用法小结
date: 2017-09-14 11:46:29
tags:
categories: [spring ]
keywords: spring
---


## 在spring容器初始化后执行操作

```java
@Component
public class AfterContextStarted implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        //存在springMVC时 可能会被调用两次(一次spring容器，一次springMVC容器)
        if(applicationContext.getParent() == null){//root application context 没有parent，他就是老大.
            //TODO something
        }
    }
}
```

## spring动态注册Bean

```java
 //通过ConfigurableListableBeanFactory可以注册一个bean
ConfigurableApplicationContext configurableApplicationContext =
                (ConfigurableApplicationContext) applicationContext;
ConfigurableListableBeanFactory beanFactory = 
                configurableApplicationContext.getBeanFactory();
beanFactory.registerSingleton(beanName, bean);
```

## 在Bean初始化时对Bean做一些操作

```java
//实现BeanPostProcessor接口
@Component
public class BeanProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName)
                throws BeansException {
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName)
             throws BeansException {
        return bean;
    }
}
```

## Spring静态工具类

```java
@Component
public class SpringContextHolder implements ApplicationContextAware {

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    private static ApplicationContext applicationContext;
    @Override
    public void setApplicationContext(ApplicationContext applicationContext)
             throws BeansException {
        SpringContextHolder.applicationContext = applicationContext;
    }
}
```