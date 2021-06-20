---
title: spring-boot中@Configuration是怎么实现@Bean方法注入的

tags: ['spring']
categories: ['spring']
originContent: ''
toc: false
date: 2021-06-03 23:18:14
keywords:
---

> 其实这个是由spring-context实现的

我们知道在spring中可以使用@Configuration注解标记的类来代替传统的xml配置，然后用@Bean注解标记方法代替`<bean>`标签

在@Configuration注解标记的类中如果bean有依赖我们可以这样写

```
/**
 * @author xizhou
 * @date 2021/6/3 22:53
 */
@Configuration
public class TestConfiguration {
    
    @Bean
    public BeanA beanA(){
        return new BeanA();
    }


    @Bean
    public BeanB beanB(){
        return new BeanB(beanA());
    }
}
```

BeanB 依赖BeanA，然后在上面的`beanB()`方法里面直接写调用 `beanA()`方法就行了.

直观来看是不是觉得会调用`beanA()`方法去生成一个`BeanA`对象。但是如果是这样的话，就和上面的`beanA()`方法注入到springIOC容器的对象不是同一个了，这明显是不正确的。

那或者应该是spring对这个`beanB()`方法里面的`beanA()`方法调用做了AOP处理，然后就可以和上面的`beanA()`方法获取到同一个对象

但是我们想到在spring AOP中有个经典的this问题，上面这样不就是 AOP this问题吗？那spring是怎么实现代理的呢？
![挠头.gif (240×240) (xyz327.cn)](http://cdn.xyz327.cn/%E6%8C%A0%E5%A4%B4.gif)

答案就在`org.springframework.context.annotation.ConfigurationClassPostProcessor`类中

我们直接看`org.springframework.context.annotation.ConfigurationClassPostProcessor#enhanceConfigurationClasses`方法
对`@Configuration`标记的类有下面的操作

```
Class<?> configClass = beanDef.getBeanClass();
Class<?> enhancedClass = enhancer.enhance(configClass, this.beanClassLoader);

beanDef.setBeanClass(enhancedClass);
```

我们可以看到spring是对整个类做了一个AOP然后把代理后的类作为`BeanClass` 就这样在上面`beanB()`方法中调用`beanA()`方法其实是调用的经过代理够的`beanA()`方法.然后也就没有AOP this问题了

![](http://cdn.xyz327.cn/%E5%A4%B4%E5%8F%91%E6%B6%88%E5%A4%B1.jpg)



